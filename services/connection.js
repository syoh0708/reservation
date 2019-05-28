import mysql from "mysql2/promise"
import mysql_config from "./mysql"

const db_pool = mysql.createPool(mysql_config);
const db_query = async (query) => {
	try {
		const connection = await db_pool.getConnection(async conn => conn);
		try {
            const [rows] = await connection.query(query);
            
			return rows;
		} catch (err) {
            throw err;
        } finally {
            connection.release();
        }
	} catch (err) {
		throw err;
	}
}


export default db_query;