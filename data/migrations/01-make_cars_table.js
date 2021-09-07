exports.up = async function (knex) {
 await knex.schema.createTable('cars', table => {
   table.increments()
   table.string('vin', 128).unique().notNullable()
   table.string('make', 128).notNullable()
   table.string('model', 120).notNullable()
   table.decimal('mileage').notNullable()
   table.string('title')
   table.string('transmission')
 })
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('cars')
};
