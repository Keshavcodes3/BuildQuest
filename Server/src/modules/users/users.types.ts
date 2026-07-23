import mongoose,{Types} from 'mongoose'


export interface userInterface{
    name:string,
    email:string,
    username:string,
    password:string,
    avatar:string,
    role:"Learner" | "Admin" | "Creator",
    isEmailVerified:boolean,
}
