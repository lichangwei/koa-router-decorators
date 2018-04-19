const path = require('path');
const glob = require('glob');

const router = new require('koa-router')();

function route(method, path, ...middlewares){
	return function(target, property, descriptor){
		process.nextTick(function(){
			let mws = [];
			if(target.middlewares){
				mws = mws.concat(target.middlewares);
			}
			if(middlewares){
				mws = mws.concat(middlewares);
			}
			mws.push(target[property]);
			router[method](path, ...mws);
		});
	};
}

function middlewares(...middlewares){
	return function(target){
		target.prototype.middlewares = middlewares;
	};
}

module.exports = {
	get: (...args)=>route('get', ...args),
	put: (...args)=>route('put', ...args),
	del: (...args)=>route('del', ...args),
	post: (...args)=>route('post', ...args),
	patch: (...args)=>route('patch', ...args),
	
	route,
	middlewares,

	load: function(prefix, folder, options){
		options = options || {};
		let extname = options.extname || '.js';
		glob.sync(path.join(folder, `./**/*${extname}`)).forEach((item)=>require(item));
		return router.prefix(prefix);
	}
};