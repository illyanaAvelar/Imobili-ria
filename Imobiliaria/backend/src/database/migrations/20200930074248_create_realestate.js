
exports.up = function(knex) {
    return knex.schema.createTable('realestate', function(table){
        table.string('id').primary();
        table.string('email').notNullable();
        table.string('name').notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('realestate');
};
