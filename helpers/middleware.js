const Projects = require('../projects/projectsDb');
const Actions = require('../actions/actionsDb');

module.exports = {
   validateProjectId: async function (req, res, next) {
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
   },

   validateProject: function (req, res, next) {
      if (Object.keys(req.body).length !== 0 && req.body.constructor === Object) {
         if (req.body.name && req.body.description) {
            next();
         } else {
            res.status(400).json({ message: "missing required name and/or description fields" })
         }
      } else {
         res.status(400).json({ message: "missing project data" })
      }
   },

   validateActionId: async function (req, res, next) {
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
   },

   validateAction: async function (req, res, next) {
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
   }
}