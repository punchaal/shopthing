const app = require('../src/app');
const supertest = require('supertest');

describe('Testing endpoints', () => {
  it(`passes the upperlimit, responding with 201 and an array `, function() {
    const upperLimit = { upperLimit: 10 };

    return supertest(app)
      .post('/api')
      .send(upperLimit)
      .expect(200)
      .expect(res => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });

  it(`when a negative upperlimit is passed, it responds with 400 `, function() {
    const upperLimit = { upperLimit: -1 };

    return supertest(app)
      .post('/api')
      .send(upperLimit)
      .expect(422);
  });

  it(`when there is no upperlimit, it responds with 400`, function() {
    const upperLimit = null;
    return supertest(app)
      .post('/api')
      .send(upperLimit)
      .expect(400);
  });

  it(`when n is greater than 1000000, it responds with 422`, function() {
    const upperLimit = { upperLimit: 100000000 };

    return supertest(app)
      .post('/api')
      .send(upperLimit)
      .expect(422);
  });
});
