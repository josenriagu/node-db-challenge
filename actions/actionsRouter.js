const express = require('express');

const Actions = require('./actionsDb');
const Projects = require('../projects/projectsDb')
const router = express.Router();

router.get('/', async (req, res) => {
   try {
      const actions = await Actions.getActions();
      res.status(200).json(actions);
   } catch (error) {
      res.status(500).json({
         message: 'Oops! something\'s gone wrong. Hang on while we fix it together'
      });
   }
});

router.get('/:id', validateActionId, async (req, res) => {
   try {
      res.status(200).json(req.action);
   } catch (error) {
      res.status(500).json({
         message: 'Oops! something\'s gone wrong. Hang on while we fix it together'
      });
   }
});

router.post('/', validateAction, async (req, res) => {
   try {
      const action = await Actions.insertAction(req.body);
      res.status(201).json(action);
   } catch (error) {
      console.log(error)
      res.status(500).json({
         message: 'Oops! something\'s gone wrong. Hang on while we fix it together'
      });
   }
});

router.put('/:id', validateActionId, validateAction, async (req, res) => {
   try {
      const action = await Actions.updateAction(req.action[0].id, req.body)
      res.status(200).json({ success: true, action })
   } catch (error) {
      res.status(500).json({
         message: 'Oops! something\'s gone wrong. Hang on while we fix it together'
      });
   }
});

router.delete('/:id', validateActionId, async (req, res) => {
   try {
      await Actions.removeAction(req.action[0].id);
      res.status(200).json({ success: true })
   } catch (error) {
      res.status(500).json({
         message: 'Oops! something\'s gone wrong. Hang on while we fix it together'
      })
   }
});

// custom middleware
async function validateActionId(req, res, next) {
   let { id } = req.params;
   id = Number(id);
   if (Number.isInteger(id)) {
      req.valid = true;
      const action = await Actions.getActionById(id)
      if (action) {
         req.action = action;
         next();
      } else {
         res.status(404).json({ message: 'Oops! the action with that id has gone MIA!' });
      }
   } else {
      res.status(400).json({ message: 'id must be integer values' });
   }
};

async function validateAction(req, res, next) {
   if (Object.keys(req.body).length !== 0 && req.body.constructor === Object) {
      if (req.body.project_id && req.body.description && req.body.notes) {
         if (req.body.description.length <= 128) {
            const project = await Projects.getProjectById(req.body.project_id);
            if (project) {
               next();
            } else {
               res.status(400).json({ message: 'project id does not exist' })
            }
         } else {
            res.status(400).json({ message: 'too long a description' })
         }
      } else {
         res.status(400).json({ message: 'missing required notes and/or description and/or project_id fields' })
      }
   } else {
      res.status(400).json({ message: 'missing action data' })
   }
};

module.exports = router;