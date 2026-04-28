import {DataTypes,Model} from 'sequelize';
import sequelize from '../../config/db.js';

class Shop extends Model{}
Shop.init({
    id:{
        type:DataTypes.UUID, 
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        primaryKey:true 
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    owner:{
        type:DataTypes.UUID,
        allowNull:false
    },
    contact:{
        type:DataTypes.STRING,
        allowNull:false
    },
    location:{
        type:DataTypes.STRING,
        allowNull:false
    },


}, {
    sequelize,
    modelName:'Shop',
    tableName:'shops',
    timestamps:true,
})
export default Shop;