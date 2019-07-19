const db = require('../data/dbConfig');
const mappers = require('../helpers/mappers')

module.exports = {
   getActions,
   getActionById,
   insertAction,
   updateAction,
   removeAction
};

async function getActions() {
   const query = await db('actions');
   mappers.refiner(query);
   return query;
}

async function getActionById(id) {
   let actions = await db('actions as a')
      .where('a.id', id);

   if (actions.length !== 0) {
      mappers.refiner(actions);
      return actions;
   }
   return null
}

function insertAction(action) {
   return db('actions')
      .insert(action)
      .then(([id]) => getActionById(id));
}

function updateAction(id, changes) {
   return db('actions')
      .where('id', id)
      .update(changes)
      .then(count => (count > 0 ? getActionById(id) : null));
}

function removeAction(id) {
   return db('actions')
      .where('id', id)
      .del();
}