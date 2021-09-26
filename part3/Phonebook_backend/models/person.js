const mongoose = require('mongoose')
const url =
  `mongodb+srv://test:test@cluster0.72qi1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
// const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

  const personsSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
  
  personsSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Person', personsSchema)