const utils = require('./utils.js');
const expect = require('expect');

describe('Utils', () => {
  it('Should add 2 numbers', () => {
    var res = utils.add(33, 11);
    expect(res).toBe(44).toBeA('number');
  });

  it('Should async add two nums', (done) => {
    utils.asyncAdd(4, 3, (sum) => {
      expect(sum).toBe(7).toBeA('number');
      done();
    });
  });

  it('Should square a number', () => {
    var res = utils.square(5);
    expect(res).toBe(25).toBeA('number');
  });

  it('Should async square a number', (done) => {
    utils.asyncSquare(7, (square) => {
      expect(square).toBe(49).toBeA('number');
      done();
    });
  });
});

it('Should verify first and last names are set', () => {
  var res = utils.setName({}, 'Jorge Pino');
  expect(res).toInclude({
    firstName: 'Jorge',
    lastName: 'Pino'
  });
  expect(res.firstName).toBeA('string');
  expect(res.lastName).toBeA('string');
});

// it('Should expect some values', () => {
//   //expect(12).toNotBe(12);
//   //expect({name: 'jorge'}).toNotEqual({name: 'Jorge'});
//   //expect([2,3,4]).toInclude(2);
//   expect({
//     name: 'Jorge',
//     age: 37,
//     location: 'Bilbao'
//   }).toInclude({
//     age: 37
//   });
// });
