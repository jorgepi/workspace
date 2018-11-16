console.log('Starting app.js');

const fs = require('fs');
//const os = require('os');
const _ = require('lodash');
const notes = require('./notes.js');
const yargs = require('yargs');

const argv = yargs
  .command('add', 'Add a new note', {
    title: notes.fetchArgument('title'),
    body: notes.fetchArgument('body')
  })
  .command('list', 'List all the notes')
  .command('read', 'Read a note', {
    title: notes.fetchArgument('title')
  })
  .command('remove', 'Remove a note', {
    title: notes.fetchArgument('title')
  })
  .help()
  .argv;
var command = process.argv[2];
console.log('Command: ', command);
console.log('Process', process.argv);
console.log('Yargs', argv);

if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log(`Note ${argv.title} created`);
  }  else {
    console.log(`Note ${argv.title} already exist`);
  }
} else if (command === 'list') {
  var note = notes.getAll();
  for (var i = 0; i < note.length; i++)
    console.log(`Note: ${note[i].title} - Body: ${note[i].body}`)
} else if (command === 'read') {
  var note = notes.readNote(argv.title);
  if (note.length === 0) {
    console.log(`Note ${argv.title} not found`);
  } else {
    for (var i = 0; i < note.length; i++)
      console.log(`Note: ${note[i].title} - Body: ${note[i].body}`)
  }
} else if (command === 'remove') {
  var note = notes.removeNote(argv.title);
  if (note === true) {
    console.log(`Note ${argv.title} removed`);
  }  else {
    console.log(`Note ${argv.title} doesn't exist`);
  }
} else {
  console.log('Command not recognised');
}
// var filteredArray = _.uniq(['Mike']);
// console.log(filteredArray);
// console.log(_.isString(true));
// console.log(_.isString('Jorge'));

// console.log('Result:', notes.add(9, -2));
// var user = os.userInfo();
//
// fs.appendFileSync('greetings.txt', `Hello ${user.username}! You are ${notes.age}`);
