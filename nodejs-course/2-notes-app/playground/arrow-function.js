// var square = (x) => {
//   var result = x * x;
//   return result;
// };

var square = (x) => x * x;

console.log(square(7));

var user = {
  name: 'Jorge',
  sayHi: () => {
    // will not work
    console.log(`Hi. I am ${this.name}`);
  },
  sayHiAlt () {
    // will work
    console.log(`Hi. I am ${this.name}`);
  }
};

user.sayHiAlt();
