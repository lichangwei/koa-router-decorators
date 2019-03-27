/// <reference types="koa-compose" />
import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
declare type LoadOptions = {
    /**
     * 路由文件扩展名，默认值是`.{js,ts}`
     */
    extname?: string;
};
declare type RouteOptions = {
    /**
     * 适用于某个请求比较特殊，需要单独制定前缀的情形
     */
    prefix?: string;
    /**
     * 给当前路由添加一个或多个中间件
     */
    middlewares?: Array<Koa.Middleware>;
};
export declare const get: (path: string, options?: RouteOptions) => (target: any, property: string, descriptor: any) => void;
export declare const post: (path: string, options?: RouteOptions) => (target: any, property: string, descriptor: any) => void;
export declare const put: (path: string, options?: RouteOptions) => (target: any, property: string, descriptor: any) => void;
export declare const del: (path: string, options?: RouteOptions) => (target: any, property: string, descriptor: any) => void;
export declare const patch: (path: string, options?: RouteOptions) => (target: any, property: string, descriptor: any) => void;
/**
 * 应用在类上，以给该类中所有路由添加中间件
 * @param middlewares Koa.Middleware数组
 */
export declare const middlewares: (middlewares: import("koa-compose").Middleware<Koa.ParameterizedContext<any, {}>>[]) => (target: any) => void;
export declare const load: (prefix: string, folder: string, options?: LoadOptions) => KoaRouter<any, {}>;
export {};
