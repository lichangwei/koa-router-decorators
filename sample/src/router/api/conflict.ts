import * as Koa from 'koa';
import { get, post } from '../../../../src/index';

class Conflict {
    @get('/conflict/users/:id')
    async getUserById(ctx: Koa.Context) {
        ctx.body = '';
    }

    @get('/conflict/users/summary')
    async getUserSummary(ctx: Koa.Context) {
        ctx.body = '';
    }

    @post('/conflict/users/:id')
    async getUser(ctx: Koa.Context) {
        ctx.body = '';
    }

    @post('/conflict/users/analytics')
    async user(ctx: Koa.Context) {
        ctx.body = '';
    }
}
