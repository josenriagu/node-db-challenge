const db = require('../data/dbConfig');
const mappers = require('../helpers/mappers')

module.exports = {
   getProjects,
   getProjectById,
   insertProject,
   updateProject,
   removeProject
};

async function getProjects() {
   const query = await db('projects');
   mappers.refiner(query);
   return query;
}

function getProjectActions(projectId) {
   return db('actions')
      .where('project_id', projectId);

}

async function getProjectById(id) {
   let projects = await db('projects as p')
      .where('p.id', id);
   let projectActions = await getProjectActions(id);
   if (projects.length !== 0) {
      mappers.refiner(projects);
      mappers.refiner(projectActions);
      let result = {
         id: projects[0].id,
         name: projects[0].name,
         description: projects[0].description,
         completed: projects[0].completed,
         actions: projectActions
      }
      return result;
   }
   return null
}

function insertProject(project) {
   return db('projects')
      .insert(project)
      .then(([id]) => getProjectById(id));
}

function updateProject(id, changes) {
   return db('projects')
      .where('id', id)
      .update(changes)
      .then(count => (count > 0 ? getProjectById(id) : null));
}

function removeProject(id) {
   return db('projects')
      .where('id', id)
      .del();
}
