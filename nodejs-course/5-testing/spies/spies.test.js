const expect = require('expect');
const rewire = require('rewire');

var app = rewire('./app');

describe('App', () => {
  var db = {
    saveUser: expect.createSpy()
  };
  app.__set__('db', db)

  it('Sould call the spy correctly', () => {
    var spy = expect.createSpy();
    spy('Jorge', 37);
    expect(spy).toHaveBeenCalledWith('Jorge', 37);
  });

  it('Should call saveUser with user object', () => {
    var email = 'jorge@example.com';
    var password = '123abc';

    app.handleSignup(email, password);
    expect(db.saveUser).toHaveBeenCalledWith({email, password});
  });
});
