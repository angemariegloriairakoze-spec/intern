import Product from "../models/products.js";

export const seedProduct=async()=>{
    const products=[{
    name:"Gabo 1",
    size:"small",
    price:"$10",
    type:"gabo",
    description:"This is a small gabo product",
    image:"",
    status:"available"
},{
    name:"Gabo 2",
    size:"medium",
    price:"$20",
    type:"gabo",
    description:"This is a medium gabo product",
    image:"",
    status:"available"
},{
    name:"Abana 1",
    size:"small",
    price:"$15",
    type:"abana",
    description:"This is a small abana product",
    image:"",
    status:"available"
    }]
    await Product.bulkCreate(products);
}