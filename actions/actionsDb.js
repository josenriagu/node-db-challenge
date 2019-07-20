const db = require('../data/dbConfig');
const mappers = require('../helpers/mappers')

module.exports = {
   getActions: async function () {
      const query = await db('actions');
      mappers.refiner(query);
      return query;
   },

   getActionById: async function (id) {
      let actions = await db('actions as a')
         .where('a.id', id);

      if (actions.length !== 0) {
         mappers.refiner(actions);
         let [action] = actions // destructure the single action from the actions array
         return action;
      }
      return null
   },

   insertAction: function (action) {
      return db('actions')
         .insert(action)
         .then(([id]) => this.getActionById(id));
   },

   updateAction: function (id, changes) {
      return db('actions')
         .where('id', id)
         .update(changes)
         .then(count => (count > 0 ? this.getActionById(id) : null));
   },

   removeAction: function (id) {
      return db('actions')
         .where('id', id)
         .del();
   }
};
