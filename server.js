const express = require('express');
const helmet = require('helmet');

const projectsRouter = require('./projects/projectsRouter');
const actionsRouter = require('./actions/actionsRouter');

const server = express();

server.use(express.json());
server.use(helmet());
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
   try {
      res.status(200).json('Welcome to your projects mapper API')
   } catch (error) {
      res.status(500).json({message: 'Oops! something\'s gone wrong. Hang on while we fix it together'})
   }
})

module.exports = server;