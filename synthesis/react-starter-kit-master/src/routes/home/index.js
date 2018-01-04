/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';

async function action({ fetch }) {
  // 说明这个函数里面部分数据是异步的
  const resp = await fetch('/graphql', {
    body: JSON.stringify({
      query: '{news{title,link,content}}',
    }),
  });
  const { data } = await resp.json(); // 这里后面内容要等到异步返回后才执行
  if (!data || !data.news) throw new Error('Failed to load the news feed.');
  return {
    chunks: ['home'],
    title: 'React Starter Kit',
    component: (
      <Layout>
        <Home news={data.news} />
      </Layout>
    ),
  };
}

export default action;
