# koa-router-decors

简化`koa-router`路由书写方法。

## 使用方法

1. 书写路由文件`user.ts`;

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

2. 加载路由文件

```typescript
import * as Koa from 'koa';
import { load } from 'koa-router-decors';

const app = new Koa();
app.use(load('/api', 'router_path', { verbose: true }).routes());
app.listen(9100);
```
