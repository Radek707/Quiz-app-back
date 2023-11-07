// import { DataSource } from "typeorm";
// import {config} from "../config/config";
//
// export const AppDataSource = new DataSource({
//     type: 'mysql',
//     host: 'localhost',
//     port: 3306,
//     username: config.dbUser,
//     password: config.dbPassword,
//     database: config.dbDatabase,
//     entities: [],
//     bigNumberStrings: false,
//     logging: true,
//     synchronize: true,
// })
// AppDataSource.initialize()
//     .then(() => {
//         console.log("Data Source has been initialized!")
//     })
//     .catch((err) => {
//         console.error("Error during Data Source initialization", err)
//     })