import { request } from "express";

//promise method
const asyncHandler = (requestHandler) => {
    (req,res,next) => {
        return Promise.resolve(requestHandler(req,res,next))
        .catch((err) = next(err));
    }
}

export default asyncHandler;

//now try catch method

// step 1:const asyncHandler = () => {}
// step 2 : cosnt asyncHandler = (func) => {}
// step 3 : const asyncHandler = (func) => async (req,res,next) => {}
// These are Higher Order Functions in JavaScript. They are functions that take a function as an argument and return a function.

// const asyncHandler = (func) => async (req,res,next) => {
//     try{
//         await func(req,res,next);
//     }
//     catch(err){
//         res.status(500).json(
//             {
//                 message:err.message,
//                 success:false
//             }
//         );
//     }

// }