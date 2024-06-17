const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");


const multer = require('multer');
const { storage } = require("../cloudconfig.js");
const upload = multer({ storage });

router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, upload.single('listing[image]'), wrapAsync(listingController.createListing)); // Note the lowercase "post"

// Display the form to create a new listing
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner,  upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListings))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListings));

// Display the form to edit a specific listing
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;
