import express from 'express'
import { createServer } from 'http'
import { Server as SocketServer } from 'socket.io'

const app = express()
const httpServer = createServer(app)
const io = new SocketServer(httpServer)

// const io = new SocketServer(httpServer, {
//   cors: {
//     origin: 'http://localhost:5173'
//   }
// }) // Proxy is not needed if cors is set

io.on('connection', (socket) => {
  console.log(`New client connected ${socket.id}`)

  socket.on('message', (body) => {
    console.log(body)
    socket.broadcast.emit('message', {
      body,
      from: socket.id.slice(6)
    })
  })
})

httpServer.listen(3000, () => console.log('Server is running'))
