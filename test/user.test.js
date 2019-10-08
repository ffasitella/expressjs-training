const request = require('supertest');
const app = require('../app');

describe('SignUp tests', () => {
  test('Succesful case', () => {
    const userToCreate = {
      email: 'user@wolox.com.ar',
      firstName: 'new',
      lastName: 'user',
      password: 'Asd123456*'
    };
    request(app)
      .post('/users')
      .send(userToCreate)
      .then(() => {
        expect(200);
      });
  });

  test('Invalid password 1: Less than 8 characters', () => {
    const userToCreate = {
      email: 'user@wolox.com.ar',
      firstName: 'new',
      lastName: 'user',
      password: 'Asd123'
    };
    request(app)
      .post('/users')
      .send(userToCreate)
      .then(res => {
        expect(400);
        expect(res.body.message).toMatch(/Invalid password/);
      });
  });

  test('Invalid password 2: Not alpanumeric', () => {
    const userToCreate = {
      email: 'user@wolox.com.ar',
      firstName: 'new',
      lastName: 'user',
      password: '123123123123123'
    };
    request(app)
      .post('/users')
      .send(userToCreate)
      .then(res => {
        expect(400);
        expect(res.body.message).toMatch(/Invalid password/);
      });
  });

  test('Invalid model 1: Mail is not part of Wolox domain', () => {
    const userToCreate = {
      email: 'user@wolx.com.ar',
      firstName: 'new',
      lastName: 'user',
      password: 'Asdasdasd123'
    };
    request(app)
      .post('/users')
      .send(userToCreate)
      .then(res => {
        expect(400);
        expect(res.body.message).toMatch(/Email must be part of Wolox domain/);
      });
  });

  test('Invalid model 2: No first name', () => {
    const userToCreate = {
      email: 'user@wolox.com.ar',
      lastName: 'user',
      password: 'Asdasdasd123'
    };
    request(app)
      .post('/users')
      .send(userToCreate)
      .then(res => {
        expect(400);
        expect(res.body.message).toMatch(/Please add first name/);
      });
  });

  test('Invalid model 3: No last name', () => {
    const userToCreate = {
      email: 'user@wolox.com.ar',
      firstName: 'user',
      password: 'Asdasdasd123'
    };
    request(app)
      .post('/users')
      .send(userToCreate)
      .then(res => {
        expect(400);
        expect(res.body.message).toMatch(/Please add last name/);
      });
  });

  test('Email is already in use', () => {
    const userToCreate = {
      email: 'user@wolox.com.ar',
      firstName: 'new',
      lastName: 'user',
      password: 'Asd123456'
    };
    request(app)
      .post('/users')
      .send(userToCreate)
      .then(() => {
        request(app)
          .post('/users')
          .send(userToCreate)
          .then(res => {
            expect(res.body.message).toMatch(/Email is already in use/);
          });
      });
  });
});
