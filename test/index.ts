import * as assert from 'assert';
import 'mocha';
import * as Koa from 'koa';
import * as request from 'supertest';

import { load } from '../src/index';

const app = new Koa();
app.use(load('/api', `${__dirname}/router`, { mode: 'development' }).routes());
const server = app.listen(9100);

describe('正确收集路由', () => {
    'GET,PUT,POST,DELETE,PATCH'.split(',').forEach((method) => {
        const name = method.toLowerCase();
        it(`${method} /api/method`, (done) => {
            request(server)
                [name]('/api/method')
                .expect('Content-Type', /application\/json/)
                .expect('X-Response-Time', /\d+/)
                .expect((res) => assert.equal(res.body.method, method))
                .end(done);
        });
    });
});
