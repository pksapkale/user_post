import mysql from "mysql2";
import * as dotenv from "dotenv";
dotenv.config();

const pool = mysql
    .createPool({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        connectTimeout: 60 * 60 * 1000,
        multipleStatements: true
    })
    .promise();

(async () => {
    try {
        const connection = await pool.getConnection();
        console.log("Successfully connected to the MySQL server !!");
        connection.release();
    } catch (error) {
        console.log("Error in connecting to MySQL database", error);
    }
})();

export default pool;