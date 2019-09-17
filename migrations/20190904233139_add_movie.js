
exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('movie', function (table){
    table.increments()
    table.string('path')
    table.string('entry')
    table.string('code')
    table.string('cover')
    table.datetime('createDateTime')
    table.datetime('watchDateTime')
    table.decimal('rating')
    table.index(['code'], 'movie_code_idx');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('movie')
};
