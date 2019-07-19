exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('projects').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {
          name: 'Duolingo German Monthly Meetup',
          description:
            'Set of actions against the upcoming duolingo meetup',
        },
      ]);
    });
};
