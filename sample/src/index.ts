import * as Koa from 'koa';
import * as router from '../../src/index';

const app = new Koa();
app.use(router.load('/api', `${__dirname}/router`, { extname: '.ts' }).routes());
export default app.listen(9100);
console.log('Server started: http://localhost:9100');
