const mongoose = require('mongoose')

// const blogSchema = new mongoose.Schema({
//   content: {
//     type: String,
//     required: true,
//     minlength: 5
//   },
//   date: {
//     type: Date,
//     required: true,
//   },
//   important: Boolean,
// })

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})


blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const url =
  `mongodb+srv://test:test@cluster0.72qi1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

module.exports = mongoose.model('Blog', blogSchema)