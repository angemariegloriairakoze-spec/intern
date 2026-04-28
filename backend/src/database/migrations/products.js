import sequelize from "../../config/db.js";
import Product from "../models/products.js";


 export const createProductTable= async ()=>{
    try {
        await sequelize.authenticate();
        await Product.sync({alter:true,logging:false});
        console.log('product table created ');
    } catch (error) {
        console.log("failed to create product table",error)
    }
} 

   
