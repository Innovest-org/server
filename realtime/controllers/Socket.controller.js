const { getIo } = require('../../config/socket');

const socketHandler = (socket) => {
  console.log('Socket connected:', socket.id);

  //Join a room
  socket.on('joinCommunity', (communityId) => {
    socket.join(communityId);
    console.log(`Socket ${socket.id} joined community ${communityId}`);
  });

  // Handle post creation
  socket.on('createPage', (pageData) => {
    getIo().to(pageData.community_id).emit('pagePending', pageData);
  });

  socket.on('approvePost', (pageData) => {
    getIo().to(pageData.community_id).emit('pageApproved', pageData);
  });

  socket.on('rejectPost', (pageData) => {
    getIo().to(pageData.community_id).emit('pageRejected', pageData);
  });

  socket.on('updatePage', (pageData) => {
    getIo().to(pageData.community_id).emit('pageUpdated', pageData);
  });

  socket.on('deletePage', (pageData) => {
    getIo().to(pageData.community_id).emit('pageDeleted', pageData);
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });

}

module.exports = socketHandler;
