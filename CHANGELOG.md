# 更新日志

`koa-router-decors`项目的重要修改都记录在此文档中。格式基于[如何维护更新日志](https://keepachangelog.com/zh-CN/1.0.0/)，并且该项目遵守[语义化版本](https://semver.org/lang/zh-CN/)。

## 【尚未发布的更新】

## 【2.0.0】 - 2018-08-30

### 修改

-   `load`函数加载方式编程`import { load } from 'koa-router-decors';`
-    路由文件扩展名默认值从`.js`改成`.{js,ts}`

### 新增

-   新增`verbose`参数，默认为`false`，为真时会打印所有路由
-   使用`TypeScript`；使用`prettier`格式化代码；添加测试用例，测试覆盖率；
