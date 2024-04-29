const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const adminSchema = new Schema({
  ID: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role:{
    type :String ,
    reuqired :true ,
    enum:['admin'],
    default: 'admin'
  }
})

// static signup method
adminSchema.statics.signup = async function(ID, password) {

  const exists = await this.findOne({ ID })

  if (exists) {
    throw Error('ID already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const admin = await this.create({ ID, password: hash })

  return admin
}

// static login method
adminSchema.statics.login = async function(ID, password) {

  if (!ID || !password) {
    throw Error('All fields must be filled')
  }

  const admin = await this.findOne({ ID })
  if (!admin) {
    throw Error('Incorrect ID')
  }

  const match = await bcrypt.compare(password, admin.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return admin
}

module.exports = mongoose.model('Admin', adminSchema)