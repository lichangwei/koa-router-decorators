/// <reference types="koa-compose" />
import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
declare type HTTPMethod = 'get' | 'put' | 'del' | 'post' | 'patch';
declare type LoadOptions = {
    /**
     * 路由文件扩展名，默认值是`.{js,ts}`
     */
    extname?: string;
    /**
     * 是否打印详细信息，默认不打印
     */
    verbose?: boolean;
};
export declare const get: (path: string, ...middlewares: import("koa-compose").Middleware<Koa.Context>[]) => (target: any, property: any, descriptor: any) => void;
export declare const put: (path: string, ...middlewares: import("koa-compose").Middleware<Koa.Context>[]) => (target: any, property: any, descriptor: any) => void;
export declare const del: (path: string, ...middlewares: import("koa-compose").Middleware<Koa.Context>[]) => (target: any, property: any, descriptor: any) => void;
export declare const post: (path: string, ...middlewares: import("koa-compose").Middleware<Koa.Context>[]) => (target: any, property: any, descriptor: any) => void;
export declare const patch: (path: string, ...middlewares: import("koa-compose").Middleware<Koa.Context>[]) => (target: any, property: any, descriptor: any) => void;
export declare const middlewares: (...middlewares: import("koa-compose").Middleware<Koa.Context>[]) => (target: any) => void;
export declare const route: (method: HTTPMethod, path: string, ...middlewares: import("koa-compose").Middleware<Koa.Context>[]) => (target: any, property: any, descriptor: any) => void;
export declare const load: (prefix: string, folder: string, options?: LoadOptions) => KoaRouter;
export {};
