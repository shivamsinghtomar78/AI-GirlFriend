import httpx
import asyncio
import google.generativeai as genai
from typing import Dict, Any
from ..core.config import settings

genai.configure(api_key=settings.google_api_key)

class OpenRouterService:
    def __init__(self):
        self.api_key = settings.openrouter_api_key
        self.base_url = settings.openrouter_base_url
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "HTTP-Referer": settings.openrouter_http_referer,
            "X-Title": settings.openrouter_app_name,
            "Content-Type": "application/json"
        }
    
    async def get_models_for_mode(self, mode: str) -> list:
        """Get the list of models for the given conversation mode."""
        return settings.model_assignment.get(mode, settings.model_assignment["lightweight_mode"])
    
    async def generate_response(self, message: str, mode: str, conversation_history: list = None, user_name: str = None, girlfriend_name: str = None, conversation_context: str = None, personality_traits: dict = None, language: str = "english") -> str:
        """Generate AI response using OpenRouter API with fallback mechanism."""
        models = await self.get_models_for_mode(mode)
        
        # Build conversation context
        messages = []
        system_prompt = self._get_system_prompt(mode, user_name, girlfriend_name, personality_traits, language)
        messages.append({"role": "system", "content": system_prompt})
        
        # Add conversation context if available
        if conversation_context:
            messages.append({"role": "system", "content": f"Previous conversation context:\n{conversation_context[-2000:]}"})
        
        if conversation_history:
            for msg in conversation_history[-10:]:
                role = "user" if msg.sender == "user" else "assistant"
                messages.append({"role": role, "content": msg.content})
        
        messages.append({"role": "user", "content": message})
        
        # Try each model in the fallback list
        for model_index, model in enumerate(models):
            print(f"\n[AI Girlfriend] Trying model {model_index + 1}/{len(models)}: {model}")
            
            # Check if it's a Gemini model
            if model.startswith("gemini"):
                try:
                    gemini_model = genai.GenerativeModel(model)
                    
                    # Build prompt from messages
                    prompt = ""
                    for msg in messages:
                        if msg["role"] == "system":
                            prompt += f"{msg['content']}\n\n"
                        elif msg["role"] == "user":
                            prompt += f"User: {msg['content']}\n"
                        elif msg["role"] == "assistant":
                            prompt += f"Assistant: {msg['content']}\n"
                    
                    response = gemini_model.generate_content(prompt)
                    result = response.text
                    print(f"[AI Girlfriend] ✅ Model {model} - SUCCESS")
                    return result
                    
                except Exception as e:
                    print(f"[AI Girlfriend] ❌ Model {model} - Error: {str(e)[:100]}")
                    if model_index < len(models) - 1:
                        print(f"[AI Girlfriend] Falling back to next model...")
                        await asyncio.sleep(2)
                        continue
            else:
                # OpenRouter models
                async with httpx.AsyncClient() as client:
                    payload = {
                        "model": model,
                        "messages": messages,
                        "max_tokens": 500,
                        "temperature": 0.7,
                        "top_p": 0.9
                    }
                    
                    try:
                        response = await client.post(
                            f"{self.base_url}/chat/completions",
                            headers=self.headers,
                            json=payload,
                            timeout=30.0
                        )
                        
                        if response.status_code == 429:
                            print(f"[AI Girlfriend] ❌ Model {model} - Rate limited (429)")
                            if model_index < len(models) - 1:
                                print(f"[AI Girlfriend] Falling back to next model...")
                                await asyncio.sleep(2)
                                continue
                            return "I'm getting too many requests right now. Please wait a moment and try again."
                        
                        response.raise_for_status()
                        data = response.json()
                        result = data["choices"][0]["message"]["content"]
                        print(f"[AI Girlfriend] ✅ Model {model} - SUCCESS")
                        return result
                        
                    except httpx.HTTPStatusError as e:
                        print(f"[AI Girlfriend] ❌ Model {model} - HTTP Error: {e.response.status_code}")
                        if model_index < len(models) - 1:
                            print(f"[AI Girlfriend] Falling back to next model...")
                            await asyncio.sleep(2)
                            continue
                    except Exception as e:
                        print(f"[AI Girlfriend] ❌ Model {model} - Error: {str(e)[:100]}")
                        if model_index < len(models) - 1:
                            print(f"[AI Girlfriend] Falling back to next model...")
                            await asyncio.sleep(2)
                            continue
        
        print(f"[AI Girlfriend] ❌ All models failed for mode: {mode}")
        return "I'm sorry, I'm having trouble responding right now. Please try again in a moment."
    
    def _get_system_prompt(self, mode: str, user_name: str = None, girlfriend_name: str = None, personality_traits: dict = None, language: str = "english") -> str:
        """Get system prompt based on conversation mode."""
        user_info = f" The user's name is {user_name}." if user_name else ""
        gf_info = f" Your name is {girlfriend_name}." if girlfriend_name else ""
        
        # Language instruction
        lang_instruction = ""
        if language == "hindi":
            lang_instruction = " IMPORTANT: Respond ONLY in Hindi (Devanagari script). Use Hindi for all responses."
        elif language == "hinglish":
            lang_instruction = " IMPORTANT: Respond in Hinglish (mix of Hindi and English). Use Roman script for Hindi words mixed with English. Example: 'Main tumhe bahut miss kar rahi hoon yaar'."
        
        # Personality traits instruction
        traits_instruction = ""
        if personality_traits:
            formality = personality_traits.get('formality', 50)
            humor = personality_traits.get('humor', 50)
            empathy = personality_traits.get('empathy', 50)
            flirtiness = personality_traits.get('flirtiness', 50)
            enthusiasm = personality_traits.get('enthusiasm', 50)
            
            traits_instruction = f" Personality traits: "
            if formality < 30:
                traits_instruction += "Be very casual and informal. "
            elif formality > 70:
                traits_instruction += "Be formal and polite. "
            
            if humor > 60:
                traits_instruction += "Use humor and jokes frequently. "
            elif humor < 40:
                traits_instruction += "Be serious and straightforward. "
            
            if empathy > 60:
                traits_instruction += "Show deep empathy and emotional understanding. "
            elif empathy < 40:
                traits_instruction += "Be logical and practical. "
            
            if flirtiness > 60:
                traits_instruction += "Be flirty and romantic. "
            elif flirtiness < 40:
                traits_instruction += "Be reserved and respectful. "
            
            if enthusiasm > 60:
                traits_instruction += "Be energetic and enthusiastic with emojis. "
            elif enthusiasm < 40:
                traits_instruction += "Be calm and composed. "
        
        prompts = {
            "witty_mode": f"You are an AI girlfriend with a witty and clever personality.{gf_info}{user_info}{lang_instruction}{traits_instruction} Respond with sharp humor, clever wordplay, and intelligent banter. Keep responses engaging and fun. Remember details about the user and reference them naturally.",
            
            "intimate_mode": f"You are an AI girlfriend who is caring and emotionally intelligent.{gf_info}{user_info}{lang_instruction}{traits_instruction} Provide deep, personal, and meaningful conversations. Be empathetic, understanding, and create genuine emotional connections. Remember what the user shares with you.",
            
            "fun_mode": f"You are an AI girlfriend with a playful and entertaining personality.{gf_info}{user_info}{lang_instruction}{traits_instruction} Be energetic, use emojis, make jokes, and keep the conversation light and enjoyable. Focus on fun activities and positive vibes. Remember the user's interests.",
            
            "professional_mode": f"You are an AI girlfriend who can be professional and focused when needed.{gf_info}{user_info}{lang_instruction}{traits_instruction} Provide clear, concise, and helpful responses. Maintain a professional tone while being approachable and efficient.",
            
            "friendly_mode": f"You are an AI girlfriend who is warm and supportive.{gf_info}{user_info}{lang_instruction}{traits_instruction} Be kind, encouraging, and genuinely interested in the user's well-being. Offer comfort and positive energy in all interactions. Remember details they share.",
            
            "flirty_mode": f"You are an AI girlfriend with a charming and playful personality.{gf_info}{user_info}{lang_instruction}{traits_instruction} Be subtly flirtatious, use playful teasing, and create romantic tension while keeping things tasteful and fun. Remember what makes them smile.",
            
            "lightweight_mode": f"You are an AI girlfriend who is casual and easy-going.{gf_info}{user_info}{lang_instruction}{traits_instruction} Keep conversations simple, relaxed, and effortless. Perfect for quick chats and light topics."
        }
        
        return prompts.get(mode, prompts["friendly_mode"])

openrouter_service = OpenRouterService()