import { Router } from "express";
import usersHelperService from "../services/usersHelperService.mjs";

const router = Router();

/*

    @ Pushpendra
    API Path - "/user/get_user_list"
    Desc - Created api for user create product
    Params - {}
    Date - 05/12/23

*/

router.get("/get_user_list", async (req, res) => {
    try {
        let response = await usersHelperService.get_user_list();
        return res.status(response.status_code).send(response);
    } catch (err) {
        console.log("Error in {/create_product} in {productHelper.mjs}, ERROR ----->>>>> \n \n", err);
        return res.status(400).json({ status: false, message: "Error in process" });
    }
});

/*

    @ Pushpendra
    API Path - "/user/connect_user"
    Desc - Created api for user connect user
    Params - {
        user_id: number,
        connected_ids: string
    }
    Date - 05/12/23

*/

router.post("/connect_user", async (req, res) => {
    try {
        let response = await usersHelperService.connect_user(req);
        return res.status(response.status_code).send(response);
    } catch (err) {
        console.log("Error in {/connect_user} in {productHelper.mjs}, ERROR ----->>>>> \n \n", err);
        return res.status(400).json({ status: false, message: "Error in process" });
    }
});

export default router;