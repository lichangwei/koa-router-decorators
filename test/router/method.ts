import { get, put, post, del, patch, middlewares } from '../../src/index';

async function setResponseTime(ctx, next) {
    let date = new Date();
    await next();
    ctx.set('X-Response-Time', String(new Date().getTime() - date.getTime()));
}

async function log(ctx, next) {
    await next();
}

@middlewares(setResponseTime)
class Method {
    @get('/method', log)
    async get(ctx) {
        ctx.body = {
            method: ctx.method,
        };
    }

    @put('/method', log)
    async update(ctx) {
        ctx.body = {
            method: ctx.method,
        };
    }

    @patch('/method', log)
    async find(ctx) {
        ctx.body = {
            method: ctx.method,
        };
    }

    @del('/method', log)
    async remove(ctx) {
        ctx.body = {
            method: ctx.method,
        };
    }

    @post('/method', log)
    async create(ctx) {
        ctx.body = {
            method: ctx.method,
        };
    }
}
