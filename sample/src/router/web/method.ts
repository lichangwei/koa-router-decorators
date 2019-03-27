import * as Koa from 'koa';
import { get } from '../../../../src/index';

class Method {
    @get('/method')
    async get(ctx: Koa.Context) {
        ctx.body = {
            method: ctx.method,
        };
    }
}
