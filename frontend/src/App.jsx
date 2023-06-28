import { useState, useEffect } from 'react'
import io from 'socket.io-client'

// const socket = io('http://localhost:3000')
const socket = io('/')

const App = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newMessage = { from: 'Me', body: message }

    setMessages([...messages, newMessage])
    socket.emit('message', message)
  }

  useEffect(() => {
    socket.on('message', receiveMessage)
    return () => {
      socket.off('message', receiveMessage)
    }
  }, [])

  const receiveMessage = (message) =>
    setMessages((state) => [...state, message])

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type='text' id='message' placeholder='Enter message'
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type='submit'>Send</button>
      </form>

      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            {message.from}: {message.body}
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
