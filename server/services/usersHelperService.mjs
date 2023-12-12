import pool from "../db/connection.mjs";

const usersHelperService = {
    /*
 
        @ Pushpendra
        Method Name - {get_user_list}
        Desc - Created method for getting users list
        Date - 05/12/23
 
    */

    get_user_list: async function () {
        let getQuery = `SELECT tu.user_email, tu.user_first_name, tu.user_last_name, tu.user_id, tu.user_phone, cu.connected_user_ids FROM tm_users tu LEFT JOIN connected_users cu ON tu.user_id = cu.user_id`;
        const [rows] = await pool.query(getQuery);
        return { status: true, message: "Got product list successfully", data: rows, status_code: 200 };
    },
  
    /*
 
        @ Pushpendra
        Method Name - {connect_user}
        Desc - Created method for connect users
        Date - 05/12/23
 
    */

    connect_user: async function (req) {
        let { user_id, connected_ids } = req.body;
        let query = '', getQuery = `SELECT * FROM connected_users WHERE user_id = ?`;
        const [rows1] = await pool.query(getQuery, [user_id]);
        if(rows1 && rows1.length == 0) {
            query += ` INSERT INTO connected_users (user_id, connected_user_ids) VALUES (${user_id}, ${pool.escape(connected_ids)}) `;
        }
        else {
            query += ` UPDATE connected_users SET connected_user_ids = ${pool.escape(connected_ids)} `;
        }
        const [rows] = await pool.query(query);
        return { status: true, message: "Connected list updated successfully", data: rows, status_code: 200 };
    },
}

export default usersHelperService;
