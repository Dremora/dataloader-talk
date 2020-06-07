const sql = require("sql-tag");

knex = require("knex")(require("../knexfile").development);

module.exports.knex = knex;

module.exports.sql = sql;
module.exports.query = ({ sql, values }) =>
  knex.raw(sql, values).then((resp) => resp.rows);
