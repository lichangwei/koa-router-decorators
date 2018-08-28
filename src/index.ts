import * as path from 'path';
import * as Koa from 'koa';
import * as glob from 'glob';
import * as KoaRouter from 'koa-router';

type HTTPMethod = 'get' | 'put' | 'del' | 'post' | 'patch';
type LoadOptions = {
    extname?: string;
};

const router = new KoaRouter();

export const get = (path: string, ...middlewares: Array<Koa.Middleware>) => route('get', path, ...middlewares);
export const put = (path: string, ...middlewares: Array<Koa.Middleware>) => route('put', path, ...middlewares);
export const del = (path: string, ...middlewares: Array<Koa.Middleware>) => route('del', path, ...middlewares);
export const post = (path: string, ...middlewares: Array<Koa.Middleware>) => route('post', path, ...middlewares);
export const patch = (path: string, ...middlewares: Array<Koa.Middleware>) => route('patch', path, ...middlewares);

export const middlewares = function middlewares(...middlewares: Array<Koa.Middleware>) {
    return function(target) {
        target.prototype.middlewares = middlewares;
    };
};

export const route = function(method: HTTPMethod, path: string, ...middlewares: Array<Koa.Middleware>) {
    return function(target, property, descriptor) {
        process.nextTick(function() {
            let mws = [];
            //这是一个简单的中间件，将用户输入的路由部分添加到`ctx.params`中
            mws.push(async function addPathToParams(ctx, next) {
                ctx.params.route = path;
                await next();
            });
            if (target.middlewares) {
                mws = mws.concat(target.middlewares);
            }
            if (middlewares) {
                mws = mws.concat(middlewares);
            }
            mws.push(target[property]);
            router[method](path, ...mws);
        });
    };
};

export const load = function(prefix: string, folder: string, options?: LoadOptions): KoaRouter {
    options = options || {};
    let extname = options.extname || '.js';
    glob.sync(path.join(folder, `./**/*${extname}`)).forEach((item) => require(item));
    return router.prefix(prefix);
};

export default {
    get,
    put,
    del,
    post,
    patch,
    route,
    middlewares,
    load,
};
