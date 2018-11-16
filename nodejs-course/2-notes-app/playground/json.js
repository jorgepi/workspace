const fs = require('fs');

var originalNote = {
  title: "Matrix",
  body: "watch the film"
}

var originalNoteString = JSON.stringify(originalNote);
fs.writeFileSync('notes.json', originalNoteString);

var noteString = fs.readFileSync('notes.json');

var note = JSON.parse(noteString);
console.log(typeof note);
console.log(note.title);

// var personString = '{"name": "Jorge", "age": 37}';
// var person = JSON.parse(personString);
// console.log(typeof person);
// console.log(person);

// var obj = {
//   name: 'Jorge'
// };
//
// var stringObj = JSON.stringify(obj);
//
// console.log(typeof stringObj);
// console.log(stringObj);
