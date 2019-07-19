const express = require('express');

const Projects = require('./projectsDb');

const router = express.Router();

router.get('/', async (req, res) => {
   try {
      const projects = await Projects.getProjects();
      res.status(200).json(projects)
   } catch (error) {
      res.status(500).json({
         message: 'Oops! something\'s gone wrong. Hang on while we fix it together'
      });
   }
});

router.get('/:id', validateProjectId, (req, res) => {
   try {
      res.status(200).json(req.project);
   } catch (error) {
      res.status(500).json({
         message: 'Oops! something\'s gone wrong. Hang on while we fix it together'
      });
   }
});

router.post('/', validateProject, async (req, res) => {
   try {
      const project = await Projects.insertProject(req.body)
      res.status(201).json(project)
   } catch (error) {
      res.status(500).json({
         message: 'Oops! something\'s gone wrong. Hang on while we fix it together'
      });
   }
});

// custom middleware
async function validateProjectId(req, res, next) {
   let { id } = req.params;
   id = Number(id);
   if (Number.isInteger(id)) {
      req.valid = true;
      const project = await Projects.getProjectById(id)
      if (project) {
         req.project = project;
         next();
      } else {
         res.status(404).json({ message: 'Oops! the project with that id has gone MIA!' });
      }
   } else {
      res.status(400).json({ message: 'id must be integer values' });
   }
};

function validateProject(req, res, next) {
   if (Object.keys(req.body).length !== 0 && req.body.constructor === Object) {
      if (req.body.name && req.body.description) {
         next();
      } else {
         res.status(400).json({ message: "missing required name and/or description fields" })
      }
   } else {
      res.status(400).json({ message: "missing project data" })
   }
};

module.exports = router;