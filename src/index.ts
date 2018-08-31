import * as path from 'path';
import * as Koa from 'koa';
import * as glob from 'glob';
import * as PathToRegexp from 'path-to-regexp';
import * as KoaRouter from 'koa-router';

type HTTPMethod = 'get' | 'put' | 'del' | 'post' | 'patch';
type LoadOptions = {
    /**
     * 开发模式还是生产模式，默认为生成模式
     */
    mode?: 'development' | 'production';
    /**
     * 路由文件扩展名，默认值是`.{js,ts}`
     */
    extname?: string;
};
function getDefaultLoadOptions() {
    return {
        mode: 'production',
        extname: '.{js,ts}',
    };
}
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
        // 如果不使用`process.nextTick`，则得不到`target.middlewares`
        process.nextTick(() => {
            let mws = [];
            // 将用户输入的路由部分添加到`ctx.params`中
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
    options = Object.assign(getDefaultLoadOptions(), options);
    glob.sync(path.join(folder, `./**/*${options.extname}`)).forEach((item) => require(item));
    router.prefix(prefix);
    if (options.mode === 'development') {
        process.nextTick(() => printAllRoute(router));
        process.nextTick(() => checkConflict(router));
    }
    return router;
};
