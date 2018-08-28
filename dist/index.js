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
var path = require("path");
var glob = require("glob");
var KoaRouter = require("koa-router");
var router = new KoaRouter();
exports.get = function (path) {
    var middlewares = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        middlewares[_i - 1] = arguments[_i];
    }
    return exports.route.apply(void 0, ['get', path].concat(middlewares));
};
exports.put = function (path) {
    var middlewares = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        middlewares[_i - 1] = arguments[_i];
    }
    return exports.route.apply(void 0, ['put', path].concat(middlewares));
};
exports.del = function (path) {
    var middlewares = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        middlewares[_i - 1] = arguments[_i];
    }
    return exports.route.apply(void 0, ['del', path].concat(middlewares));
};
exports.post = function (path) {
    var middlewares = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        middlewares[_i - 1] = arguments[_i];
    }
    return exports.route.apply(void 0, ['post', path].concat(middlewares));
};
exports.patch = function (path) {
    var middlewares = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        middlewares[_i - 1] = arguments[_i];
    }
    return exports.route.apply(void 0, ['patch', path].concat(middlewares));
};
exports.middlewares = function middlewares() {
    var middlewares = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        middlewares[_i] = arguments[_i];
    }
    return function (target) {
        target.prototype.middlewares = middlewares;
    };
};
exports.route = function (method, path) {
    var middlewares = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        middlewares[_i - 2] = arguments[_i];
    }
    return function (target, property, descriptor) {
        var mws = [];
        //这是一个简单的中间件，将用户输入的路由部分添加到`ctx.params`中
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
        if (middlewares) {
            mws = mws.concat(middlewares);
        }
        mws.push(target[property]);
        router[method].apply(router, [path].concat(mws));
    };
};
exports.load = function (prefix, folder, options) {
    options = Object.assign({
        extname: '.js',
        verbose: false,
    }, options);
    glob.sync(path.join(folder, "./**/*" + options.extname)).forEach(function (item) { return require(item); });
    if (options.verbose) {
        console.log(router.stack.map(function (route) { return route.path; }));
    }
    return router.prefix(prefix);
};
