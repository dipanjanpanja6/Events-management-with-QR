const EventTableName = "events"

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable(EventTableName, table => {
    table.increments().primary()
    table.string("title").notNullable()
    table.text("description")
    table.dateTime("start").notNullable()
    table.dateTime("end").notNullable()
    table.timestamps(true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists(EventTableName)
}
