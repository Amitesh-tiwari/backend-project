import mongoose, {Schema} from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        username :{
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true,
            index : true //index is made true because if u want to search the user by username then it will be faster
        },
        email:{
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true
        },
        fullname :{ 
            type : String,
            required : true,
            trim : true,
            index : true
        },
        avatar :{
            type : String,//cloudinary API
            required : true,
        },
        coverImage : {
            type : String
        },
        watchHistory : [
            {
                type : Schema.Types.ObjectId,//special type of object id which takes the reference of the Model
                ref : "Video"
            }
        ],
        password: {
            type : String,
            required : [true, "Password is required"],
        },
        refreshToken : {
            type : String
        },
    },{timestamps : true}
    
)

//pre middleware is used to run the code before the save method is called
//this is used to hash the password before saving it to the database
// in the arguments of the pre middlewares we haven't used arrow function because we want to use the this keyword
// and arrow function doesn't have this keyword it does not provide the current state of the object so thats why we have used normal function
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = bcryptjs.hash(this.password, 10);
    //The number 10 in the bcryptjs.hash method is the number of rounds 
    //that the data is processed for. This is also known as the cost factor.
})

//this is a custom made method to compare the password, bcryptjs.compare is used to compare the password
//this method is used to compare the password entered by the user and the password stored in the database
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcryptjs.compare(password, this.password);

}
export const User =  mongoose.model("User", userSchema);