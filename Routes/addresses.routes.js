const router = require("express").Router();
const {
    addAddress,
    removeAddress,
    getLoggedUserAddresses
} = require("../controllers/addresses.controller");

const { auth, allowedTo } = require("../controllers/auth.controller");

router.use(auth, allowedTo("user"));

router.route("/").post(addAddress).get(getLoggedUserAddresses);

router.delete("/:addressId", removeAddress);

module.exports = router;
