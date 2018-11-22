const request = require('supertest');
const expect = require('expect');
var app = require('./server').app;

describe('Server', () => {
  describe('GET /', () => {
    it('Should return Page Not Found response', (done) => {
      request(app)
        .get('/')
        .expect(404)
        .expect((res) => {
          expect(res.body).toInclude({
            error: 'Page not found'
          });
        })
        .end(done);
    });
  });
  describe('GET /users', () => {
    it('Should return my user object', (done) => {
      request(app)
        .get('/users')
        .expect(200)
        .expect((res) => {
          expect(res.body[0]).toInclude({
            name: 'Jorge'
          });
        })
        .end(done);
    });
  });
});
