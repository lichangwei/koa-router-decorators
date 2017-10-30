'use strict';

const Koa = require('koa');

const app = new Koa();

let router = require('../index.js').load('/api', `${__dirname}/router`);
app.use(router.routes());

app.listen(9100);

console.log('Server started: http://localhost:9100');