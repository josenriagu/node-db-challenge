const express = require('express');

const Projects = require('./projectsDb');
const mw = require('../helpers/middleware');

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

router.get('/:id', mw.validateProjectId, (req, res) => {
   try {
      res.status(200).json(req.project);
   } catch (error) {
      res.status(500).json({
         message: 'Oops! something\'s gone wrong. Hang on while we fix it together'
      });
   }
});

router.post('/', mw.validateProject, async (req, res) => {
   try {
      const project = await Projects.insertProject(req.body)
      res.status(201).json(project)
   } catch (error) {
      res.status(500).json({
         message: 'Oops! something\'s gone wrong. Hang on while we fix it together'
      });
   }
});

router.put('/:id', mw.validateProjectId, mw.validateProject, async (req, res) => {
   try {
      const project = await Projects.updateProject(req.project.id, req.body)
      res.status(200).json({ success: true, project })
   } catch (error) {
      res.status(500).json({
         message: 'Oops! something\'s gone wrong. Hang on while we fix it together'
      });
   }
});

router.delete('/:id', mw.validateProjectId, async (req, res) => {
   try {
      await Projects.removeProject(req.params.id);
      res.status(200).json({ success: true })
   } catch (error) {
      res.status(500).json({
         message: 'Oops! something\'s gone wrong. Hang on while we fix it together'
      });
   }
});

module.exports = router;