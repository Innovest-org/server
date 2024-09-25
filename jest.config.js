module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['../server/tests/user.test.js'],
};


module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: [
    // '../server/tests/page.test.js',
    // '../server/tests/notification.test.js',
    '../server/tests/community.test.js',

  ],
};

