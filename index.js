const server = require('./server.js');

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
   console.log(`Attaboy! Your server is locked and loaded on port ${PORT}!`);
});