
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('todos').del()
    .then(function () {
      // Inserts seed entries
      return knex('todos').insert([
        {tasks: 'Meeting',urgent:"1"},
        {tasks: 'Lunch',urgent:"2"},
        {tasks: 'sleeping',urgent:"3"}
      ]);
    });
};
