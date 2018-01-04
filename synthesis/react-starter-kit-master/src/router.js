/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import UniversalRouter from 'universal-router';
import routes from './routes'; // 配置路径以及对应加载的组件

export default new UniversalRouter(routes, {
  resolveRoute(context, params) {
    // 特殊的对象，只对单页范围内的链接进行处理
    if (typeof context.route.load === 'function') {
      // 后运行，context.route对应index.js里面的children
      return context.route
        .load()
        .then(action => action.default(context, params)); // 对应相应模块index.js里面的action
    }
    if (typeof context.route.action === 'function') {
      // 其实就是先进入根目录的action，然后再运行子目录
      return context.route.action(context, params); // 先运行，context.route对应index.js，异步
    }
    return undefined;
  },
});
