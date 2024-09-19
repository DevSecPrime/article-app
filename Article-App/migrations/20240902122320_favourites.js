/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    knex.schema.createTable("favourites", (table) => {
        table.increments("id").primary();
        table.integer("userId")
            .references("id")
            .inTable("users")
            .unsigned()
            .onDelete("CASCADE")
        table.integer("articleId")
            .references("id")
            .inTable("articles")
            .unsigned()
            .onDelete("CASCADE")
        table.timestamp("createdAt").defaultTo(knex.fn.now());
        table.timestamp("updatedAt").defaultTo(knex.fn.now());
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    knex.schema.dropTable("favourites");
};
