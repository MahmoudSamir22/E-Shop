const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: [true, "Category name must be unique"],
      minlength: [3, "Too short category name"],
      maxlength: [32, "Too long category name"],
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
    const imageURL = `${process.env.BASE_URL}/categories/${doc.image}`
    doc.image = imageURL
  }
}

categorySchema.post('init', (doc) => {
  setImageURL(doc)
})

categorySchema.post('save', (doc) => {
  setImageURL(doc)
})

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
