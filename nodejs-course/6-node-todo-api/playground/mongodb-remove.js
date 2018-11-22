
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true },(err, client) => {
  if (err) {
    console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  const db = client.db('TodoApp');

  // Example of delete many
  // db.collection('Todos').deleteMany({text: "Cook pasta"}).then((result) => {
  //   console.log(result);
  // });

  // Example of delete one
  // db.collection('Todos').deleteOne({text: "Eat lunch"}).then((result) => {
  //   console.log(result);
  // });

  // Example of find one and delete (recommended)
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

  // Example of find one and delete (recommended)
  db.collection('Users').findOneAndDelete({_id: 3}).then((result) => {
    console.log(result);
  });

  // Example of delete many
  db.collection('Users').deleteMany({location: 'Basauri'}).then((result) => {
    console.log(result);
  });

  client.close();
});
