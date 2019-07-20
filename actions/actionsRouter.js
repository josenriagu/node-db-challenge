const express = require('express');

const Actions = require('./actionsDb');
const mw = require('../helpers/middleware');

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

router.get('/:id', mw.validateActionId, async (req, res) => {
   try {
      res.status(200).json(req.action);
   } catch (error) {
      res.status(500).json({
         message: 'Oops! something\'s gone wrong. Hang on while we fix it together'
      });
   }
});

router.post('/', mw.validateAction, async (req, res) => {
   try {
      const action = await Actions.insertAction(req.body);
      res.status(201).json(action);
   } catch (error) {
      res.status(500).json({
         message: 'Oops! something\'s gone wrong. Hang on while we fix it together'
      });
   }
});

router.put('/:id', mw.validateActionId, mw.validateAction, async (req, res) => {
   try {
      const action = await Actions.updateAction(req.action.id, req.body)
      res.status(200).json({ success: true, action })
   } catch (error) {
      res.status(500).json({
         message: 'Oops! something\'s gone wrong. Hang on while we fix it together'
      });
   }
});

router.delete('/:id', mw.validateActionId, async (req, res) => {
   try {
      await Actions.removeAction(req.action.id);
      res.status(200).json({ success: true })
   } catch (error) {
      res.status(500).json({
         message: 'Oops! something\'s gone wrong. Hang on while we fix it together'
      })
   }
});

module.exports = router;