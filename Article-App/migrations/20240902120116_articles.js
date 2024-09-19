/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    knex.schema.createTable("articles", (table) => {
        table.increments("id").primary();
        table.integer("categoryId")
            .references("id")
            .inTable("category")
            .notNullable()
            .unsigned()
            .onDelete("CASCADE");
        table.string("title").notNullable();
        table.string("author").notNullable();
        table.text("summary").nullable();
        table.timestamp("publishedYear").notNullable();
        table.text("abstract").notNullable();
        table.string("link").notNullable();
        table.string("journal").notNullable();
        table.timestamp("createdAt").defaultTo(knex.fn.now());
        table.timestamp("updatedAt").defaultTo(knex.fn.now());
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    knex.schema.dropTable("articles");
};
