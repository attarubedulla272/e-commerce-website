const mongoose = require("mongoose");
const initData = require("./data.js");
const Product = require("../models/listing.js");
const { object } = require("joi");


async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/ShopHub');
}
main().then(()=>{
    console.log('Connected to ShopHub database');
})
.catch((err)=>{
    console.log(err);
})

const initDB = async () => {
    await Product.deleteMany({});
    initData.data=initData.data.map((obj)=>({
        ...obj,
        seller:'686eed7db57e35b4e3f2fa54'
    })); 
     Product.insertMany(initData.data);
    console.log("Product data was initialized");
  };
  
initDB();


