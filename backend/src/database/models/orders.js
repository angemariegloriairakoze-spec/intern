import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/db.js";

class Order extends Model {}

Order.init({
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        primaryKey:true
    },

    userId:{
        type:DataTypes.UUID,
        allowNull:false
    },

    productId:{
        type:DataTypes.UUID,
        allowNull:false
    },

    sellerId:{
        type:DataTypes.UUID,
        allowNull:false
    },

    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:1
    },

    status:{
        type:DataTypes.ENUM(
            "pending",
            "approved",
            "denied"
        ),
        defaultValue:"pending"
    },

    orderDate:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:DataTypes.NOW
    },

    totalAmount:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false
    }

},{
    sequelize,
    modelName:"Order",
    tableName:"orders",
    timestamps:true
});

export default Order;