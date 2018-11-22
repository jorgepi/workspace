
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true },(err, client) => {
  if (err) {
    console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // const db = client.db('TodoApp');
  // db.collection('Todos').find({
  //   _id: new ObjectID('5bf672e631e6154854cb94e2')
  // }).toArray().then((docs) => {
  //   console.log('Todos:');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch Todos', err)
  // });

  // const db = client.db('TodoApp');
  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count: ${count}`);
  //
  // }, (err) => {
  //   console.log('Unable to fetch Todos', err)
  // });

  const db = client.db('TodoApp');
  db.collection('Users').find({
    location: "Basauri"
  }).toArray().then((docs) => {
    console.log('Jorge users:');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch Todos', err)
  });

  client.close();
});
