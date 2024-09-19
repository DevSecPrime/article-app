import knex from "knex";
import knexFile from "../../../knexfile"
import { attachPaginate } from "knex-paginate";
import dotenv from "dotenv";
dotenv.config();

//initaite databse
const environment = process.env.NODE_ENV || "development";

const db = knex(knexFile[environment]);
attachPaginate();

export default db;