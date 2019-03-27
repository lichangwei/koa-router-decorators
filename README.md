# koa-router-decors

简化`koa-router`路由书写方法。

## 使用方法

### 1. 书写路由文件`user.ts`;

```typescript
import { get, put, post, del, patch } from 'koa-router-decors';
class User {
    @get('/user')
    async get(ctx) {
        ctx.body = {
            user: {},
        };
    }
}
```

### 2. 加载路由文件

```typescript
import * as Koa from 'koa';
import { load } from 'koa-router-decors';

const app = new Koa();
app.use(load('/api', 'router_path').routes());
app.listen(9100);
```

### 3. 特殊用法

#### 3.1 特殊的路由写法

```typescript
// 给User类上所有路由添加中间件
@middlewares([setResponseTime])
class User {
    // 一个方法可以生成多个路由；针对特定路由，可以修改前缀，也可以添加中间件
    @get('/method')
    @get('/method', { prefix: '', middlewares: [] })
    async get(ctx: Koa.Context) {
        ctx.body = {
            method: ctx.method,
        };
    }
}

async function setResponseTime(ctx, next) {
    let date = new Date();
    await next();
    ctx.set('X-Response-Time', String(new Date().getTime() - date.getTime()));
}
```

#### 3.1 特殊的路由加载

```typescript
const app = new Koa();
// 可以多次调用`load`分别加载不同的目录
app.use(load('/api', `${__dirname}/router/api`).routes());
app.use(load('/web', `${__dirname}/router/web`).routes());
export default app.listen(9100);
```
