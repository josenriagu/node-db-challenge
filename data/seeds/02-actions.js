exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('actions').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('actions').insert([
        {
          project_id: 1,
          description: 'Get notepads for first 10 attendees',
          notes:
            'Check CMS/Marina bookshops',
        },
        {
          project_id: 1,
          description: 'Move to Ikoyi',
          notes: 'Stay closer to the venue to avoid gridlock ',
        },
        {
          project_id: 1,
          description: 'Send reminder mails',
          notes: 'May be automatically configured on the hosts dashboard. check!',
        },
      ]);
    });
};
