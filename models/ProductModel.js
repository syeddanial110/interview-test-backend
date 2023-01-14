const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    title: String,
    description: String,
    // image:{
    //   data: Buffer,
    //   contentType:String
    // }
    image: String
  },
  {
    timestamps: true,
  }
);

const product= new model("product", productSchema)

module.exports= product;
