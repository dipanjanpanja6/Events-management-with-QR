const ParticipantsTableName = "participants"

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable(ParticipantsTableName, table => {
    table.increments().primary()
    table.string("email")
    table.string("name")
    table.integer("event_id").references("id").inTable("events").notNullable().onDelete("CASCADE")
    table.timestamps(true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists(ParticipantsTableName)
}
