import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/db.js";

class Product extends Model { }
Product.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey:true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    size: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM("gabo", "abana"),
        allowNull: true,
        defaultValue: "gabo"
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM("available", "hold_in_stock", "unAvailable"),
        defaultValue: "available"
    },
    shop_id:{
        type:DataTypes.UUID,
        allowNull:false
    },
    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
    }
},
    {
        sequelize,
        modelName: 'Product',
        tableName: "products",
        timestamps: true
    })

export default Product;