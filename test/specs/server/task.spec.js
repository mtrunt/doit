import {
  expect
} from 'chai';

const server = require('../../../server/server.js');
const supertest = require('supertest');
const api = supertest(server);

describe('Task', () => {
  const apiRoot = '/api';

  // beforeEach(() => {
  //   return api.delete(`${apiRoot}/tasks/1`);
  // });

  it('should create a new task', () => {
    let data = {
      title: 'New task'
    };

    return api.post(`${apiRoot}/tasks`)
      .send(data)
      .expect(200)
      .then((response) => {
        expect(response.body.id).to.equal(1);
      });
  });

  it('should get all the tasks', () => {
    return api.get(`${apiRoot}/tasks`)
      .expect(200)
      .then((response) => {
        expect(response.body.length).to.equal(1);
      });
  });

  it('should delete the task', () => {
    return api.delete(`${apiRoot}/tasks/1`)
      .expect(200)
      .then((response) => {
        expect(response.body.count).to.equal(1);
      });
  });

});
