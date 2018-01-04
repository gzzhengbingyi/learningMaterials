/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

 //同构，其他路由切换则是单页

//fetch的polyfill实现，例如isomorphic-fetch和whatwg-fetch
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
//强制更新整个渲染树
import deepForceUpdate from 'react-deep-force-update';
//处理链接参数或者生成参数
import queryString from 'query-string';
/*history是一个独立的第三方js库，可以用来兼容在不同浏览器、不同环境下对历史记录的管理，拥有统一的API。具体来说里面的history分为三类:
老浏览器的history: 主要通过hash来实现，对应createHashHistory
高版本浏览器: 通过html5里面的history，对应createBrowserHistory
node环境下: 主要存储在memeory里面，对应createMemoryHistory*/
//传入pathname, search, hash的内容，帮你生成链接
import { createPath } from 'history/PathUtils';
import App from './components/App';
import createFetch from './createFetch';
//react-router赖以依存的history, 这里是做了本地包装，如果是浏览器环境就会返回createBrowserHistory()
import history from './history';
import { updateMeta } from './DOMUtils';
import router from './router';

// Global (context) variables that can be easily accessed from any React component
// https://facebook.github.io/react/docs/context.html
const context = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  //参数已经在app.js里面定义类型
  insertCss: (...styles) => {
    // eslint-disable-next-line no-underscore-dangle
    const removeCss = styles.map(x => x._insertCss());
    return () => {
      removeCss.forEach(f => f());
    };
  },
  // Universal HTTP client
  fetch: createFetch(fetch, { //返回配置好默认像的fetch函数
    baseUrl: window.App.apiUrl,
  }),
};

const container = document.getElementById('app'); //html.js,server.js调用生成
let currentLocation = history.location;
let appInstance;

// Switch off the native scroll restoration behavior and handle it manually
// https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration
const scrollPositionsHistory = {};
if (window.history && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'; //禁止页面刷新时候跳到之前的位置
}

// Re-render the app when window.location changes
async function onLocationChange(location, action) {
  // Remember the latest scroll position for the previous location
  scrollPositionsHistory[currentLocation.key] = {
    scrollX: window.pageXOffset,
    scrollY: window.pageYOffset,
  };                  
  // Delete stored scroll position for next page if any
  if (action === 'PUSH') {
    delete scrollPositionsHistory[location.key];
  }
  currentLocation = location;

  const isInitialRender = !action;
  try {
    // Traverses the list of routes in the order they are defined until
    // it finds the first route that matches provided URL path string
    // and whose action method returns anything other than `undefined`.
    const route = await router.resolve({
      ...context,
      pathname: location.pathname,
      query: queryString.parse(location.search),
    });

    // Prevent multiple page renders during the routing process
    if (currentLocation.key !== location.key) {
      return;
    }

    if (route.redirect) {
      history.replace(route.redirect);
      return;
    }

    /*这个词在react中是ssr相关的，因为ssr时服务器输出的是字符串，
    而浏览器端需要根据这些字符串完成react的初始化工作，比如创建组件实例，这样才能响应用户操作。
    这个过程就叫hydrate，有时候也会说re-hydrate可以把hydrate理解成给干瘪的字符串”注水”*/

    /*这里就会涉及到一个「由静态 DOM Node(s) 到动态可工作 DOM Node(s)」的转变过程，可以叫做 Hydration*/

    /*不像 React 15 中的 ReactDOM.render(...)，ReactDOM.hydrate(...) 总是会去尝试复用 DOM，而不再关心 checksum 是否相等3。*/


    const renderReactApp = isInitialRender ? ReactDOM.hydrate : ReactDOM.render;
    appInstance = renderReactApp(
      //回调，它将在组件渲染或更新后执行
      <App context={context}>{route.component}</App>,
      container,
      () => {
        if (isInitialRender) {
          const elem = document.getElementById('css');
          if (elem) elem.parentNode.removeChild(elem);
          return;
        }

        document.title = route.title;

        updateMeta('description', route.description);
        // Update necessary tags in <head> at runtime here, ie:
        // updateMeta('keywords', route.keywords);
        // updateCustomMeta('og:url', route.canonicalUrl);
        // updateCustomMeta('og:image', route.imageUrl);
        // updateLink('canonical', route.canonicalUrl);
        // etc.

        let scrollX = 0;
        let scrollY = 0;
        const pos = scrollPositionsHistory[location.key];
        if (pos) {
          scrollX = pos.scrollX;
          scrollY = pos.scrollY;
        } else {
          const targetHash = location.hash.substr(1);
          if (targetHash) {
            const target = document.getElementById(targetHash);
            if (target) {
              scrollY = window.pageYOffset + target.getBoundingClientRect().top;
            }
          }
        }

        // Restore the scroll position if it was saved into the state
        // or scroll to the given #hash anchor
        // or scroll to top of the page
        window.scrollTo(scrollX, scrollY);

        // Google Analytics tracking. Don't send 'pageview' event after
        // the initial rendering, as it was already sent
        if (window.ga) {
          window.ga('send', 'pageview', createPath(location));
        }
      },
    );
  } catch (error) {
    if (__DEV__) {
      throw error;
    }

    console.error(error);

    // Do a full page reload if error occurs during client-side navigation
    if (!isInitialRender && currentLocation.key === location.key) {
      window.location.reload();
    }
  }
}

// Handle client-side navigation by using HTML5 History API
// For more information visit https://github.com/mjackson/history#readme
history.listen(onLocationChange);
onLocationChange(currentLocation);

// Enable Hot Module Replacement (HMR)
if (module.hot) {
  module.hot.accept('./router', () => {
    if (appInstance && appInstance.updater.isMounted(appInstance)) {
      // Force-update the whole tree, including components that refuse to update
      deepForceUpdate(appInstance);
    }

    onLocationChange(currentLocation);
  });
}
