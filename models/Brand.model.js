const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand name is required"],
      unique: [true, "Brand name must be unique"],
      minlength: [3, "Too short Brand name"],
      maxlength: [32, "Too long Brand name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

const setImageURL = (doc) => {
  if(doc.image){
    const imageURL = `${process.env.BASE_URL}/brands/${doc.image}`
    doc.image = imageURL
  }
}

brandSchema.post('init', (doc) => {
  setImageURL(doc)
})

brandSchema.post('save', (doc) => {
  setImageURL(doc)
})

const BrandModel = mongoose.model("Brand", brandSchema);

module.exports = BrandModel;
