const mongoose= require('mongoose')
const validator= require('validator')

const User= mongoose.model('User',{
    name:{
        type:String,
        required:true,
        trim:true,
        minLength:2,
        maxLength:50,
    },
    balance:{
        type:Number,
        default:50,
        validate(value){
            if(value<15) throw new Error('Invalide value')
            }
        },
        accountNumber:{
            type:Number,
            default:0,
            validate(value){
                if(value<15) throw new Error('Invalide value')
                }
            }
        // Email:{
        //     type:String,
        //     required:true,
        //     trim:true,
        //     unique:true,
        //     validate(value){
        //         if (validator.isEmail(value)==false)
        //         throw new Error('Invalide Email')
        //     }
        // },
        //    password:{
        //     type:String,
        //     required:true,
        //     trim:true,
        //     minLength:6,
        //     maxLength:50,
        // } 
})

module.exports=User