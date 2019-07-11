
exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('todos', function (table){
    table.increments()
    table.string('tasks')
    table.integer('urgent')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('todos')
};
