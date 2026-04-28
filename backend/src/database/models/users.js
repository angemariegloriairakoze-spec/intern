import { DataTypes,Model } from "sequelize";
import sequelize from "../../config/db.js";

class User extends Model{}

User.init({
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        primaryKey:true
    },
    fullName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    phoneNumber:{
        type:DataTypes.STRING,
        allowNull:false
    },
    location:{
        type:DataTypes.STRING,
        allowNull:false
    },
    gender:{
        type:DataTypes.ENUM("female","male","others"),
        allowNull:false
    },
    age:{
       type:DataTypes.INTEGER,
       allowNull:true 
    },
    date_of_birth:{
       type:DataTypes.DATE,
       allowNull:true
    },
    role:{
        type:DataTypes.ENUM("admin","customer","seller","delivery"),
        allowNull:false,
        defaultValue:"customer"
    }

},{
    sequelize,
    modelName:"User",
    tableName:"users",
    timestamps:true
})
export default User