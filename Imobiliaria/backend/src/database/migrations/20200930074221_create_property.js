
exports.up = function(knex) {
    return knex.schema.createTable('property', function(table){
        table.increments('');
        
        table.string('tipo').notNullable();
        table.string('bairro').notNullable();
        table.string('endereco').notNullable();
        table.string('quartos').notNullable();
        table.string('suites').notNullable();
        table.string('salas').notNullable();
        table.string('vagas').notNullable();
        table.string('area').notNullable();
        table.string('armarios').notNullable();
        table.string('descricao').notNullable();
        table.string('aluguel').notNullable();
        table.string('andar');
        table.string('portaria');
        table.string('condominio');

        table.string('realestate_id').notNullable();

        table.foreign('realestate_id').references('id').inTable('realestate');
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('property');
};
