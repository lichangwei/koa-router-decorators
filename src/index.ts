import * as glob from 'glob';
import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import * as PathToRegexp from 'path-to-regexp';

type HTTPMethod = 'get' | 'put' | 'del' | 'post' | 'patch';
type LoadOptions = {
    /**
     * 路由文件扩展名，默认值是`.{js,ts}`
     */
    extname?: string;
};
type RouteOptions = {
    /**
     * 适用于某个请求比较特殊，需要单独制定前缀的情形
     */
    prefix?: string;
    /**
     * 给当前路由添加一个或多个中间件
     */
    middlewares?: Array<Koa.Middleware>;
};

export const get = (path: string, options?: RouteOptions) => route('get', path, options);
export const post = (path: string, options?: RouteOptions) => route('post', path, options);
export const put = (path: string, options?: RouteOptions) => route('put', path, options);
export const del = (path: string, options?: RouteOptions) => route('del', path, options);
export const patch = (path: string, options?: RouteOptions) => route('patch', path, options);
/**
 * 应用在类上，以给该类中所有路由添加中间件
 * @param middlewares Koa.Middleware数组
 */
export const middlewares = function middlewares(middlewares: Array<Koa.Middleware>) {
    return function(target) {
        target.prototype.middlewares = middlewares;
    };
};

let route = function(method: HTTPMethod, path: string, options: RouteOptions = {}) {
    return function(target, property: string, descriptor) {};
};

export const load = function(prefix: string, folder: string, options: LoadOptions = {}): KoaRouter {
    const extname = options.extname || '.{js,ts}';
    // 新建路由器，并且重新定义route函数
    const router = new KoaRouter();
    route = function(method: HTTPMethod, path: string, options: RouteOptions = {}) {
        return function(target, property: string, descriptor) {
            process.nextTick(() => {
                let mws = [];
                // 将用户输入的路由部分添加到`ctx.params`中
                mws.push(async function addPathToParams(ctx: Koa.Context, next) {
                    ctx.params.route = path;
                    await next();
                });
                if (target.middlewares) {
                    mws = mws.concat(target.middlewares);
                }
                if (options.middlewares) {
                    mws = mws.concat(options.middlewares);
                }
                mws.push(target[property]);
                const url = ('prefix' in options ? options.prefix : prefix) + path;
                router[method](url, ...mws);
            });
        };
    };
    glob.sync(require('path').join(folder, `./**/*${extname}`)).forEach((item) => require(item));

    // 开发环境中打印所有路由并且检查路径冲突
    if (process.env.NODE_ENV === 'development') {
        process.nextTick(() => {
            printAllRoute(router);
            checkConflict(router);
        });
    }
    return router;
};

function getRouteMethod(route) {
    return route.methods[route.methods.length - 1];
}

function printAllRoute(router: KoaRouter) {
    console.info('-'.repeat(21), 'routes', '-'.repeat(21));
    router.stack.forEach((route) => {
        console.info(`${getRouteMethod(route)}\t${route.path}`);
    });
    console.info('-'.repeat(50));
}

function checkConflict(router: KoaRouter) {
    let conflict = false;
    router.stack.forEach((route1) => {
        let paths = [];
        let method = getRouteMethod(route1);
        let regexp = PathToRegexp(route1.path);
        router.stack.forEach((route2) => {
            if (route1 === route2) return;
            if (method !== getRouteMethod(route2)) return;
            if (regexp.test(route2.path)) {
                paths.push(route2.path);
            }
        });
        if (paths.length > 0) {
            if (!conflict) {
                conflict = true;
                console.error('Conflict Route:');
            }
            console.error(`${method}\t${route1.path}`);
            console.error(paths.map((path) => `\t${path}`).join('\n'));
        }
    });
    console.info('-'.repeat(50));
}
