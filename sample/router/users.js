'use strict';

const {get, post, put, del, patch, middlewares} = require('../../index');

const middleware = (ctx, next)=>{
	console.log('execute middleware function');
	next();
}

@middlewares(middleware)
class User{
	@get('/user/:id')
	async get(ctx){
		ctx.body = {result: true};
	}

	@put('/user/:id')
	async update(ctx){
		ctx.body = {result: true};
	}

	@del('/user/:id')
	async remove(ctx){
		ctx.body = {result: true};
	}

	@post('/user')
	async create(ctx){
		ctx.body = {result: true};
	}
	
	@patch('/user/:id')
	async find(ctx){
		ctx.body = {result: true};
	}
}