import { Router } from "express";
import productHelperService from "../services/productHelperService.mjs";

const router = Router();

/*

    @ Pushpendra
    API Path - "/product/create_product"
    Desc - Created api for user create product
    Params - { 
                product_name: string, 
                product_description: string,
                product_img: file,
                user_id: number
              }
    Date - 05/12/23

*/

router.post("/create_product", async (req, res) => {
    try {
        let response = await productHelperService.create_product(req, res);
        return res.status(response.status_code).send(response);
    } catch (err) {
        console.log("Error in {/create_product} in {productHelper.mjs}, ERROR ----->>>>> \n \n", err);
        return res.status(400).json({ status: false, message: "Error in process" });
    }
});

/*

    @ Pushpendra
    API Path - "/product/get_products_connected_user"
    Desc - Created api for user create product
    Params - { user_id: number }
    Date - 05/12/23

*/

router.get("/get_products_connected_user", async (req, res) => {
    try {
        let body = req.query,
        response = await productHelperService.get_products_connected_user(body);
        return res.status(response.status_code).send(response);
    } catch (err) {
        console.log("Error in {/get_products_connected_user} in {productHelper.mjs}, ERROR ----->>>>> \n \n", err);
        return res.status(400).json({ status: false, message: "Error in process" });
    }
});

/*

    @ Pushpendra
    API Path - "/product/get_products_current_user"
    Desc - Created api for user create product
    Params - { user_id: number }
    Date - 05/12/23

*/

router.get("/get_products_current_user", async (req, res) => {
    try {
        let body = req.query,
        response = await productHelperService.get_products_current_user(body);
        return res.status(response.status_code).send(response);
    } catch (err) {
        console.log("Error in {/get_products_current_user} in {productHelper.mjs}, ERROR ----->>>>> \n \n", err);
        return res.status(400).json({ status: false, message: "Error in process" });
    }
});

export default router;
