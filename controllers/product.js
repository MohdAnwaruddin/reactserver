// const productSchema = require("../models/products")


import {Products}   from "../models/Products.js";
// import {Categories}   from "../models/Categories.js";

const createProduct = async (req, res) => {
    res.setHeader('Referrer-Policy', 'no-referrer');
   await Products.create(req.body
 
    )
    return res.status(200).json({ success: "success" });

}

const fetchProduct = async (req, res) => {
    res.setHeader('Referrer-Policy', 'no-referrer');
    console.log("fetchProduct", req.body)
   try {
    const products = await Products.find({category:req.body.categoryName})
    return res.status(200).json({ success: true, data: products });
   } catch (error) {
    return res.status(500).json({ success: false, data: null });
   }
    

}
const fetchProductDetails = async (req, res) => {
    res.setHeader('Referrer-Policy', 'no-referrer');
    console.log("fetchProduct", req.body)
    try{
        const productDetails = await Products.find({_id:req.body.id})
        return res.status(200).json({ success: true, data: productDetails });
    }
   catch (e){
    return res.status(500).json({ success: false, data: null });
   }

}
const fetchCategories = async (req, res) => {
    res.setHeader('Referrer-Policy', 'no-referrer');
    console.log("fetchProduct", req.body)
try {

    // const categories = await Products.distinct('category')

    const distinctCategories = await Products.aggregate([
        { $group: { _id: '$category', url: { $addToSet: '$url' } } },
        { $project: { _id: 0, name: '$_id', url: 1 } }
      ]);

    return res.status(200).json({ success: true, data: distinctCategories });

} catch (error) {
    
    return res.status(500).json({ success: false, data: null });
}
   

}

export default {
    createProduct,
    fetchProduct,
    fetchCategories,
    fetchProductDetails
}  