/// <reference types="koa-compose" />
import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
declare type HTTPMethod = 'get' | 'put' | 'del' | 'post' | 'patch';
declare type LoadOptions = {
    extname?: string;
};
export declare const get: (path: string, ...middlewares: import("koa-compose").Middleware<Koa.Context>[]) => (target: any, property: any, descriptor: any) => void;
export declare const put: (path: string, ...middlewares: import("koa-compose").Middleware<Koa.Context>[]) => (target: any, property: any, descriptor: any) => void;
export declare const del: (path: string, ...middlewares: import("koa-compose").Middleware<Koa.Context>[]) => (target: any, property: any, descriptor: any) => void;
export declare const post: (path: string, ...middlewares: import("koa-compose").Middleware<Koa.Context>[]) => (target: any, property: any, descriptor: any) => void;
export declare const patch: (path: string, ...middlewares: import("koa-compose").Middleware<Koa.Context>[]) => (target: any, property: any, descriptor: any) => void;
export declare const middlewares: (...middlewares: import("koa-compose").Middleware<Koa.Context>[]) => (target: any) => void;
export declare const route: (method: HTTPMethod, path: string, ...middlewares: import("koa-compose").Middleware<Koa.Context>[]) => (target: any, property: any, descriptor: any) => void;
export declare const load: (prefix: string, folder: string, options?: LoadOptions) => KoaRouter;
declare const _default: {
    get: (path: string, ...middlewares: import("koa-compose").Middleware<Koa.Context>[]) => (target: any, property: any, descriptor: any) => void;
    put: (path: string, ...middlewares: import("koa-compose").Middleware<Koa.Context>[]) => (target: any, property: any, descriptor: any) => void;
    del: (path: string, ...middlewares: import("koa-compose").Middleware<Koa.Context>[]) => (target: any, property: any, descriptor: any) => void;
    post: (path: string, ...middlewares: import("koa-compose").Middleware<Koa.Context>[]) => (target: any, property: any, descriptor: any) => void;
    patch: (path: string, ...middlewares: import("koa-compose").Middleware<Koa.Context>[]) => (target: any, property: any, descriptor: any) => void;
    route: (method: HTTPMethod, path: string, ...middlewares: import("koa-compose").Middleware<Koa.Context>[]) => (target: any, property: any, descriptor: any) => void;
    middlewares: (...middlewares: import("koa-compose").Middleware<Koa.Context>[]) => (target: any) => void;
    load: (prefix: string, folder: string, options?: LoadOptions) => KoaRouter;
};
export default _default;
