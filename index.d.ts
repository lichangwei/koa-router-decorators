import * as Koa from "koa";
import * as KoaRouter from 'koa-router';

export declare function load (prefix: string, folder: string, options: {
    extname?: string;
}): KoaRouter;

export declare function get(path: string, ...middlewares: Array<Koa.Middleware>);
export declare function put(path: string, ...middlewares: Array<Koa.Middleware>);
export declare function del(path: string, ...middlewares: Array<Koa.Middleware>);
export declare function post(path: string, ...middlewares: Array<Koa.Middleware>);
export declare function patch(path: string, ...middlewares: Array<Koa.Middleware>);

type HTTPMethod = 'get' | 'put' | 'del' | 'post' | 'patch';
export declare function route(method: HTTPMethod, path: string, ...middlewares: Array<Koa.Middleware>);

export declare function middlewares(...middlewares: Array<Koa.Middleware>): (object)=>void;