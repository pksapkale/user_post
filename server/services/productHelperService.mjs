import pool from "../db/connection.mjs";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const productHelperService = {

    /*
 
        @ Pushpendra
        Method Name - {create_product}
        Desc - Created method for uploading product image to db
        Date - 05/12/23
    
    */

    create_product: async function (req, res) {

        const folderPath = join(__dirname, '..', 'uploads');
        if (!fs.existsSync(folderPath)) {    // Check if the folder exists
            fs.mkdirSync(folderPath);    // If not, create the folder
        }
        let response1 = await this.uploadFileToDB(req, res);  // Getting file into db/local storage
        if (response1.status) {
            let object_name = response1.fileNewName; // here we are getting file name
            let { product_name, product_description, user_id } = JSON.parse(req.body.data);
            let insertQuery = `INSERT INTO products SET ?`;
            let obj = { product_name: product_name, product_description: product_description, product_img: object_name, user_id: user_id, created_on: +new Date(), modified_on: +new Date() };
            const [rows] = await pool.query(insertQuery, obj);
            return { status: true, message: "Product Inserted successfully", data: [], status_code: 200 };
        }
        else {
            return { status: false, message: "Error in create product", data: [], status_code: 400 };
        }
    },

    /*
 
        @ Pushpendra
        Method Name - {uploadFileToDB}
        Desc - Created method for creating new file in local storage or db
        Date - 05/12/23
 
    */

    uploadFileToDB(req, res) {
        return new Promise(response => {
            if (!req.files || Object.keys(req.files).length === 0) {
                return response({ status: false });
            }
            const { file } = req.files;
            const uploadPath = join(__dirname, '..', 'uploads');
            // Using new file name so it can be unique
            let file_name = `${Date.now()}_${file.name}`;
            // Move the uploaded file to the specified path
            file.mv(`${uploadPath}/${file_name}`, (err) => {
                if (err) {
                    return response({ status: false });
                }
                return response({ status: true, fileNewName: file_name });
            });
        })
    },

    /*
 
        @ Pushpendra
        Method Name - {get_products_current_user}
        Desc - Created method for getting product list of current user
        Date - 05/12/23
 
    */

    get_products_current_user: async function (body) {
        let { user_id } = body;
        let getQuery = `SELECT * FROM products WHERE user_id = ?`;
        const [rows] = await pool.query(getQuery, [user_id]);
        return { status: true, message: "Got product list successfully", data: rows, status_code: 200 };
    },

    /*
 
        @ Pushpendra
        Method Name - {get_products_connected_user}
        Desc - Created method for getting product list of connected user
        Date - 05/12/23
 
    */

    get_products_connected_user: async function (body) {
        let { user_id } = body, connected_user_ids = null;
        let getConnectedUserQuery = `SELECT * FROM connected_users WHERE user_id = ?`;
        const [connectedUsersRows] = await pool.query(getConnectedUserQuery, [user_id]);    // Getting connected user ids here
        if(connectedUsersRows && connectedUsersRows.length > 0) {
            connected_user_ids = connectedUsersRows[0]['connected_user_ids'];
            let getQuery = `SELECT * FROM products WHERE user_id IN (${connected_user_ids})`;
            const [rows] = await pool.query(getQuery);      // Getting connected users product list here 
            return { status: true, message: "Got product list successfully", data: rows, status_code: 200 };
        }
        else {
            return { status: true, message: "You do not have any connected user", data: [], status_code: 200 };
        }
    },

}

export default productHelperService;