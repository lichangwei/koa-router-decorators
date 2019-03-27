"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var glob = require("glob");
var KoaRouter = require("koa-router");
var PathToRegexp = require("path-to-regexp");
exports.get = function (path, options) { return route('get', path, options); };
exports.post = function (path, options) { return route('post', path, options); };
exports.put = function (path, options) { return route('put', path, options); };
exports.del = function (path, options) { return route('del', path, options); };
exports.patch = function (path, options) { return route('patch', path, options); };
/**
 * 应用在类上，以给该类中所有路由添加中间件
 * @param middlewares Koa.Middleware数组
 */
exports.middlewares = function middlewares(middlewares) {
    return function (target) {
        target.prototype.middlewares = middlewares;
    };
};
var route = function (method, path, options) {
    if (options === void 0) { options = {}; }
    return function (target, property, descriptor) { };
};
exports.load = function (prefix, folder, options) {
    if (options === void 0) { options = {}; }
    var extname = options.extname || '.{js,ts}';
    // 新建路由器，并且重新定义route函数
    var router = new KoaRouter();
    route = function (method, path, options) {
        if (options === void 0) { options = {}; }
        return function (target, property, descriptor) {
            process.nextTick(function () {
                var mws = [];
                // 将用户输入的路由部分添加到`ctx.params`中
                mws.push(function addPathToParams(ctx, next) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    ctx.params.route = path;
                                    return [4 /*yield*/, next()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                if (target.middlewares) {
                    mws = mws.concat(target.middlewares);
                }
                if (options.middlewares) {
                    mws = mws.concat(options.middlewares);
                }
                mws.push(target[property]);
                var _path = require('path').join('prefix' in options ? options.prefix : prefix, path);
                router[method].apply(router, [_path].concat(mws));
            });
        };
    };
    glob.sync(require('path').join(folder, "./**/*" + extname)).forEach(function (item) { return require(item); });
    // 开发环境中打印所有路由并且检查路径冲突
    if (process.env.NODE_ENV === 'development') {
        process.nextTick(function () {
            printAllRoute(router);
            checkConflict(router);
        });
    }
    return router;
};
function getRouteMethod(route) {
    return route.methods[route.methods.length - 1];
}
function printAllRoute(router) {
    console.info('-'.repeat(21), 'routes', '-'.repeat(21));
    router.stack.forEach(function (route) {
        console.info(getRouteMethod(route) + "\t" + route.path);
    });
    console.info('-'.repeat(50));
}
function checkConflict(router) {
    var conflict = false;
    router.stack.forEach(function (route1) {
        var paths = [];
        var method = getRouteMethod(route1);
        var regexp = PathToRegexp(route1.path);
        router.stack.forEach(function (route2) {
            if (route1 === route2)
                return;
            if (method !== getRouteMethod(route2))
                return;
            if (regexp.test(route2.path)) {
                paths.push(route2.path);
            }
        });
        if (paths.length > 0) {
            if (!conflict) {
                conflict = true;
                console.error('Conflict Route:');
            }
            console.error(method + "\t" + route1.path);
            console.error(paths.map(function (path) { return "\t" + path; }).join('\n'));
        }
    });
    console.info('-'.repeat(50));
}
