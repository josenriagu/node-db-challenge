exports.up = function (knex) {
   return knex.schema
      .createTable('projects', project => {
         project.increments();
         project.string('name', 128).notNullable();
         project.string('description', 128).notNullable();
         project.boolean('completed').defaultTo(false);
      })
      .createTable('actions', action => {
         action.increments();
         action
            .integer('project_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('projects')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
         action.string('description', 128).notNullable();
         action.text('notes').notNullable();
         action.boolean('completed').defaultTo(false);
      });
};

exports.down = function (knex) {
   return knex.schema
      .dropTableIfExists('projects')
      .dropTableIfExists('actions');
};
