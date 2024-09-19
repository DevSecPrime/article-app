/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    knex.schema.createTable("users", (table) => {
        table.increments("id").primary();
        table.string("countryCode", 50).notNullable();
        table.string("phoneNo").notNullable();
        table.integer("otp").nullable();
        table.timestamp("otpVerifiedAt").nullable();
        table.timestamp("otpExipiresAt").defaultTo(knex.fn.now());
        table.timestamp("createdAt").defaultTo(knex.fn.now());
        table.timestamp("updatedAt").defaultTo(knex.fn.now());
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    knex.schema.dropTable("users");
};
