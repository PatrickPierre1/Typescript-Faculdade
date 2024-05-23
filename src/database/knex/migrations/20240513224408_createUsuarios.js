/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable("usuarios", (table) => {
            table.increments("id");
            table.text("nome").notNullable();
            table.text("email").notNullable();
            table.text("senha").notNullable();
            table.timestamp("created_at").defaultTo(knex.fn.now());
            table.timestamp("updated_at").defaultTo(knex.fn.now());
        })
        .then((result) => {
            console.log("Tabela de usuarios criada!");
        })
        .catch((err) => {
            console.log(err);
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.down = function (knex) {
    return knex.schema
        .dropTable("usuarios")
        .then((result) => {
            console.log("Deletada tabela de Usuarios");
        })
        .catch((err) => {
            console.log(err);
        });
};
