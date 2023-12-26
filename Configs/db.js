import mongoose from 'mongoose'
const user ="developer"
const pass="Ft8IHKa0OlundgXO"
const url=`mongodb+srv://${user}:${pass}@cluster0.fhhjmee.mongodb.net/?retryWrites=true&w=majority`;
const connection = async () => {
  try {
    mongoose.connect(
      url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    )
    console.log('DB CONNECTION ESTABLISHED')
  } catch (err) {
    console.log(err)
  }
}

export default connection
