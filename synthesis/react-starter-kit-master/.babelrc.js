/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

// Babel configuration
// https://babeljs.io/docs/usage/api/
module.exports = {
  //一定要记得 preset 的顺序是反向的
  //presets相当于plugin的集合包
  presets: [
    [
      '@babel/preset-env', //每年每个 preset 只编译当年批准的内容。 而 babel-preset-env 相当于 es2015 ，es2016 ，es2017 及最新版本。
      {
        targets: {
          node: 'current',
        },
      },//如果你目标开发 Node.js 而不是浏览器应用的话，你可以配置 babel-preset-env 仅包含特定版本所需的polyfill和transform
    ],
    '@babel/preset-stage-2',
    '@babel/preset-flow',
    '@babel/preset-react',
    //react包含了
    //preset-flow 編譯 flow
    //syntax-jsx 識別 jsx 語法
    //transform-react-jsx 編譯 jsx
    //transform-react-display-name 自動添加組件的 displayName
  ],
  ignore: ['node_modules', 'build'],
};
