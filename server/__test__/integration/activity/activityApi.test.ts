import request from 'supertest';
import app from '../../../lib/app'

describe('Test the root path', () => {
    test('It should response the GET method', () => {
        return request(app).get('/').expect(200);
    });
});