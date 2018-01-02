/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

//我们建议用 Jest 作为测试引擎。

import React from 'react';
//该包提供了一个React的渲染器，可以用来将 React 组件渲染成纯 JavaScript 对象，不需要依赖于 DOM 和原生移动环境。
import renderer from 'react-test-renderer';
import App from '../App';
import Layout from './Layout';

describe('Layout', () => {
  test('renders children correctly', () => {
    //通过传来的 React 元素创建一个 TestRenderer 的实例。它并不使用真实的 DOM，但是它依然将组件树完整地渲染到内存，所以您可以对它进行断言
    //第一次跑的时候，就会生成一个快照文件，在__snapshots__目录下
    const wrapper = renderer
      .create(
        <App context={{ insertCss: () => {}, fetch: () => {} }}>
          <Layout>
            <div className="child" />
          </Layout>
        </App>,
      )
      .toJSON();

    expect(wrapper).toMatchSnapshot();
  });
});
