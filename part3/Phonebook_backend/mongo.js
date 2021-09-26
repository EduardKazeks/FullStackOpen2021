const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]


const url =
  `mongodb+srv://test:test@cluster0.72qi1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personsSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personsSchema)

const name = process.argv[3]
const number = process.argv[4]

if (name && number){
  const person = new Person({
    name,
    number,
  })


  person.save().then(result => {
    console.log(`added "${name}" number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  console.log("phonebook:")
  Person.find({}).then(result => {
   result.forEach(person => console.log(`${person.name} ${person.number}`))
  })
}