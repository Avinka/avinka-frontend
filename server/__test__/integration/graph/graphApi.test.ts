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

describe('/graphs', () => {
    test('It should respond with 201 to well formed POST requests, the body should contain the newly created graph', (done) => {
        const graph = {
            name: 'test_graph_1'
        };
        request.post('/graph')
            .send(graph)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body._id.length).toBeGreaterThan(0);
                expect(res.body.name).toEqual('test_graph_1');
                expect(res.body.createdAt.length).toBeGreaterThan(0);
                expect(moment.duration(moment(res.body.createdAt).diff(new Date())).asSeconds()).toBeLessThan(10);

                const firstGraph = res.body;
                request.get('/graph/' + res.body._id)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        if (err) return done(err);
                        expect(res.body).toEqual(firstGraph);
                        const secondGraphPayload = {
                            name: 'test_graph_2'
                        };
                        request.post('/graph')
                            .send(secondGraphPayload)
                            .set('Accept', 'application/json')
                            .expect('Content-Type', /json/)
                            .expect(201)
                            .end(function(err, res) {
                                const secondGraphResponse = res.body;
                                request.get('/graph/' + secondGraphResponse._id + ',' + firstGraph._id)
                                    .expect('Content-Type', /json/)
                                    .expect(200)
                                    .end(function(err, res) {
                                        expect(res.body.length).toEqual(2);
                                        expect(res.body[1].name).toEqual(secondGraphResponse.name);
                                        expect(res.body[0].name).toEqual(firstGraph.name);
                                        done();
                                    });
                            });
                    });
            });
    });
    test('It should respond with 404 on unknown ids', (done) => {
        request.get('/graph/' + new ObjectID())
            .send()
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .end(function(err, res) {
                done()
            });
    });
    test('It should respond with 400 on malformed ids', (done) => {
        request.get('/graph/UNKNOWN')
            .send()
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {
                done()
            });
    });
    test('It should respond with 200 on a delete request and should be gone afterwards', (done) => {
        const graph = {
            name: 'test_graph_2'
        };
        request.post('/graph')
            .send(graph)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                const resultBody = res.body;
                request.delete('/graph/' + resultBody._id)
                    .expect(200)
                    .end(function(err, res) {
                        if (err) return done(err);
                        request.get('/graph/' + resultBody._id)
                            .expect(404)
                            .end(function(err, res) {
                                if (err) return done(err);
                                done();
                            });
                    });
            });
    });
    test('It should respond with 200 on a delete request and should be gone afterwards', (done) => {
        const graph = {
            name: 'test_graph_3'
        };
        request.post('/graph')
            .send(graph)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                graph.name = 'test_graph_3_updated';
                const resultBody = res.body;
                request.put('/graph/' + resultBody._id)
                    .expect(200)
                    .send(graph)
                    .end(function(err, res) {
                        if (err) return done(err);
                        request.get('/graph/' + resultBody._id)
                            .expect(200)
                            .end(function(err, res) {
                                if (err) return done(err);
                                expect(res.body.name).toEqual(graph.name);
                                done();
                            });
                    });
            });
    });
});