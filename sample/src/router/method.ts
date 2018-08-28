import * as Koa from 'koa';
import { get, put, post, del, patch, middlewares } from '../../../src/index';

async function setResponseTime(ctx: Koa.Context, next) {
    let date = new Date();
    await next();
    ctx.set('X-Response-Time', String(new Date().getTime() - date.getTime()));
}

@middlewares(setResponseTime)
class User {
    @get('/method')
    async get(ctx: Koa.Context) {
        ctx.body = {
            method: ctx.method,
        };
    }

    @put('/method')
    async update(ctx: Koa.Context) {
        ctx.body = {
            method: ctx.method,
        };
    }

    @patch('/method')
    async find(ctx: Koa.Context) {
        ctx.body = {
            method: ctx.method,
        };
    }

    @del('/method')
    async remove(ctx: Koa.Context) {
        ctx.body = {
            method: ctx.method,
        };
    }

    @post('/method')
    async create(ctx: Koa.Context) {
        ctx.body = {
            method: ctx.method,
        };
    }
}
