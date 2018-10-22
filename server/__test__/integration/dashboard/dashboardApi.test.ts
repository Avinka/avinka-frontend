import app from '../../../lib/app';
import * as moment from 'moment';
import {Mongo} from "../../../lib/core/db/mongo";
import {ObjectID} from "bson";

const request = require('supertest')(app);

let mongo = new Mongo();

beforeEach(() => {
    mongo.connect();
});

afterEach(() => {
    mongo.disconnect();
});

describe('/dashboards', () => {
    test('It should respond with 201 to well formed POST requests, the body should contain the newly created dashboard', (done) => {
        const dashboard = {
            name: 'test_dashboard_1'
        };
        request.post('/dashboard')
            .send(dashboard)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body._id.length).toBeGreaterThan(0);
                expect(res.body.name).toEqual('test_dashboard_1');
                expect(res.body.createdAt.length).toBeGreaterThan(0);
                expect(moment.duration(moment(res.body.createdAt).diff(new Date())).asSeconds()).toBeLessThan(10);

                const resultBody = res.body;
                request.get('/dashboard/' + res.body._id)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        if (err) return done(err);
                        expect(res.body).toEqual(resultBody);
                        done();
                    });
            });
    });
    test('It should respond with 404 on unknown ids', (done) => {
        request.get('/dashboard/' + new ObjectID())
            .send()
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .end(function(err, res) {
                done()
            });
    });
    test('It should respond with 400 on malformed ids', (done) => {
        request.get('/dashboard/UNKNOWN')
            .send()
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {
                done()
            });
    });
    test('It should respond with 200 on a delete request and should be gone afterwards', (done) => {
        const dashboard = {
            name: 'test_dashboard_2'
        };
        request.post('/dashboard')
            .send(dashboard)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                const resultBody = res.body;
                request.delete('/dashboard/' + resultBody._id)
                    .expect(200)
                    .end(function(err, res) {
                        if (err) return done(err);
                        request.get('/dashboard/' + resultBody._id)
                            .expect(404)
                            .end(function(err, res) {
                                if (err) return done(err);
                                done();
                            });
                    });
            });
    });
    test('It should respond with 200 on a delete request and should be gone afterwards', (done) => {
        const dashboard = {
            name: 'test_dashboard_3'
        };
        request.post('/dashboard')
            .send(dashboard)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                dashboard.name = 'test_dashboard_3_updated';
                const resultBody = res.body;
                request.put('/dashboard/' + resultBody._id)
                    .expect(200)
                    .send(dashboard)
                    .end(function(err, res) {
                        if (err) return done(err);
                        request.get('/dashboard/' + resultBody._id)
                            .expect(200)
                            .end(function(err, res) {
                                if (err) return done(err);
                                expect(res.body.name).toEqual(dashboard.name);
                                done();
                            });
                    });
            });
    });
});