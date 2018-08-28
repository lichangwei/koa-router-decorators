import * as Koa from 'koa';
import router from '../';

const app = new Koa();
app.use(router.load('/api', `${__dirname}/router`, { extname: '.ts' }).routes());
app.listen(9100);
console.log('Server started: http://localhost:9100');
