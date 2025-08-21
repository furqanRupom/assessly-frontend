export interface IUser {
    _id?:string
    id:string
    name:string
    email:string
    role: 'student' | 'supervisor' | 'admin' | 'superAdmin'
    password:string
    isDeleted:boolean
    status:'active' | 'inactive' | 'banned'
    isVerified:boolean
    createdAt:Date
    updatedAt:Date
    
}