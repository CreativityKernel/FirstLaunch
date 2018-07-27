exports = module.exports = function (io) {
  // Set socket.io listeners.
  io.on('connection', (socket) => {
     console.log('a user connected');

    // On conversation entry, join broadcast channel
    socket.on('enter session', (session) => {
      socket.join(session);
       console.log('joined ' + session);
    });

    socket.on('leave session', (session) => {
      socket.leave(session);
      // console.log('left ' + conversation);
    });

    socket.on('new message', (session) => {
      io.sockets.in(session).emit('refresh messages', session);
    });

    socket.on('disconnect', () => {
      // console.log('user disconnected');
    });
  });
};
