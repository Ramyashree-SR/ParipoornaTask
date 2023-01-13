const mongoose=require("mongoose")

mongoose.set("strictQuery",false);
module.exports.mongoconnect=mongoose.connect(
    "mongodb+srv://Ramyashree:5DeOc9g2JtOuAP3j@cluster0.ihjrjes.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (!err) {
            console.log("Db connection successful");
        } else {
            console.log("Db failed to connect");
            console.log(err,"err");
        }
    }
)