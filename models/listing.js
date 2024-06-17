const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ref, string } = require("joi");
const Review = require("./review");

// Define the schema for the Listing model
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: {
      type: String, // Change to uppercase 'String' type
      required: true,
    },
    filename: {
      type: String, // Change to uppercase 'String' type
      required: true,
    },
  },
  price: {
    type: Number,
    required: true,
  },
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// Post hook for deleting associated reviews when a listing is deleted
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

// Create the Listing model using the schema
const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;






