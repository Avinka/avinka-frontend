import app from '../../../lib/app'
import {Activity} from "../../../lib/activity/activity";
const request = require('supertest')(app);

describe('Test the root path', () => {
    test('It should respond to GET method', () => {
        return request.get('/').expect(200);
    });
});

describe('Test posting activities', () => {
    test('It should respond with 201 to well formed POST requests', () => {
        const activity = new Activity();
        activity.actor = {type: 'Person', id:'5'};
        activity.type = 'Login';
        activity.actor = {type: 'Application', id:'web'};
        return request.post('/activity').send(activity).expect(201);
    });
});