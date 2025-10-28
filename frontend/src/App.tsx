import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Landing } from './components/landing/Landing'
import { ChatContainer } from './components/chat/ChatContainer'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/chat" element={<ChatContainer />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App