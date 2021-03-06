/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* @flow */

// flow的静态类型检测。上面定义的flow是告诉flow检查器来检查该文件，flow可以说是渐进性的,非react的内容需要类型检测
// any: 相当于不检查。既是所有类型的超集(supertype)，也是所有类型的子集(subtype)
// 类型别名(Type Alias)提供了可以预先定义与集中代码中所需要的类型，一个简单的例子如下:
type Fetch = (url: string, options: ?any) => Promise<any>;

type Options = {
  baseUrl: string,
  cookie?: string, // 代表这属性是可选的(Optional)
};

/**
 * Creates a wrapper function around the HTML5 Fetch API that provides
 * default arguments to fetch(...) and is intended to reduce the amount
 * of boilerplate code in the application.
 * https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch
 */
function createFetch(fetch: Fetch, { baseUrl, cookie }: Options) {
  // NOTE: Tweak the default options to suite your application needs
  const defaults = {
    method: 'POST', // handy with GraphQL backends
    mode: baseUrl ? 'cors' : 'same-origin',
    // Fetch 请求默认是不带 cookie 的，需要设置 fetch(url, {credentials: 'include'})
    credentials: baseUrl ? 'include' : 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(cookie ? { Cookie: cookie } : null),
    },
  };

  // 反引号是ES6的模板语法，可以插入变量
  return (url: string, options: any) =>
    url.startsWith('/graphql') || url.startsWith('/api')
      ? // ES2017 将扩展运算符（...）引入了对象。
        // 解构赋值必须是最后一个参数，否则会报错。
        /* let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
    x // 1
    y // 2
    z // { a: 3, b: 4 } */

        /* 扩展运算符可以用于合并两个对象。
    let ab = { ...a, ...b };
    // 等同于
    let ab = Object.assign({}, a, b); */
        fetch(`${baseUrl}${url}`, {
          ...defaults,
          ...options,
          headers: {
            ...defaults.headers,
            ...(options && options.headers),
          },
        })
      : fetch(url, options);
}

export default createFetch;
