import sequelize from "../../config/db.js";
import Product from "../models/products.js";

//function that will created product table
const createProductTable=async()=>{
    try {
        await sequelize.authenticate();
        await Product.sync({alter:true,logging:false})
    } catch (error) {
        console.log("failed to create product table",error)
    }
}
export default createProductTable