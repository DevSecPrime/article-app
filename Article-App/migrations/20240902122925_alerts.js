/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    knex.schema.createTable("alerts", (table) => {
        table.increments("id").primary();
        table.integer("id")
            .references("id")
            .inTable("users")
            .unsigned()
            .onDelete("CASCADE");
        table.string("day")
            .enum(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"])
            .notNullable();
        table.time("time").notNullable();
        table.string("message").defaultTo(null).nullable();
        table.timestamp("createdAt").defaultTo(knex.fn.now())
        table.timestamp("updatedAt").defaultTo(knex.fn.now())
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    knex.schema.dropTable("alerts");
};
