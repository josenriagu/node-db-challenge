const db = require('../data/dbConfig');
const mappers = require('../helpers/mappers')

module.exports = {
   getProjects: async function () {
      const query = await db('projects');
      mappers.refiner(query);
      return query;
   },

   getProjectActions: function (projectId) {
      return db('actions')
         .where('project_id', projectId);
   },

   getProjectById: async function (id) {
      let projects = await db('projects as p')
         .where('p.id', id);
      let projectActions = await this.getProjectActions(id);

      if (projects.length !== 0) {
         mappers.refiner(projects);
         mappers.refiner(projectActions);
         let [project] = projects // destructure the single project from the projects array
         let result = { ...project, actions: projectActions } // build the return project in the specified format
         return result;
      }
      return null
   },

   insertProject: function (project) {
      return db('projects')
         .insert(project)
         .then(([id]) => this.getProjectById(id));
   },

   updateProject: function (id, changes) {
      return db('projects')
         .where('id', id)
         .update(changes)
         .then(count => (count > 0 ? this.getProjectById(id) : null));
   },

   removeProject: function (id) {
      return db('projects')
         .where('id', id)
         .del();
   }
};
