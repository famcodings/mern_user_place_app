const HttpError = require('../models/http-error')
const { v4: uuidv4 } = require('uuid');


const DUMMY_USERS = [
    {
      id: 'u1',
      name: 'Glen Maxwell',
      email: 'test@test.com',
      password: 'testers'
    }
]

const getUsers = (req, res, next) => {
    res.json({users: DUMMY_USERS})
}


const signup = (req, res, next) => {
   const {name, email, password} = req.body
   
   const hasUser = DUMMY_USERS.find(u => u.email === email)
   if(hasUser){
    throw new HttpError("User with provided email already exists.", 422)
   }
   
   const createdUser = {
        id: uuidv4(),
        name,
        email,
        password
   }
   DUMMY_USERS.push(createdUser)
   res.status(201).json({user: createdUser})

}

const login = (req, res, next) => {
    const { email, password } = req.body
    const user = DUMMY_USERS.find(u => u.email === email)
    if(!user || user.password !== password){
        throw new HttpError("Invalid Credentials", 401)
    }
    res.json({message: 'Logged in!'})  
}


exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;