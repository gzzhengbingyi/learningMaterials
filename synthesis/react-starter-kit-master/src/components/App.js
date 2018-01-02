/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types'; //React 有一些内置的类型检查功能，PropTypes 包含一整套验证器，可用于确保你接收的数据是有效的

const ContextType = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  // 你也可以在任何 PropTypes 属性后面加上 `isRequired` 
  // 后缀，这样如果这个属性父组件没有提供时，会打印警告信息
  insertCss: PropTypes.func.isRequired,
  // Universal HTTP client
  fetch: PropTypes.func.isRequired,
};

/**
 * The top-level React component setting context (global) variables
 * that can be accessed from all the child components.
 *
 * https://facebook.github.io/react/docs/context.html
 *
 * Usage example:
 *
 *   const context = {
 *     history: createBrowserHistory(),
 *     store: createStore(),
 *   };
 *
 *   ReactDOM.render(
 *     <App context={context}>
 *       <Layout>
 *         <LandingPage />
 *       </Layout>
 *     </App>,
 *     container,
 *   );
 */
 //React.PureComponent 与 React.Component 几乎完全相同，
 //但 React.PureComponent 通过prop和state的浅对比来实现 shouldComponentUpate()。
 //如果React组件的 render() 函数在给定相同的props和state下渲染为相同的结果，
 //在某些场景下你可以使用 React.PureComponent 来提升性能。
class App extends React.PureComponent {
  static propTypes = {
    context: PropTypes.shape(ContextType).isRequired, //一个指定属性及其类型的对象
    children: PropTypes.element.isRequired, //使用 PropTypes.element 你可以指定只传递一个子代
  };

  //通过在MessageList（context提供者）中添加childContextTypes和getChildContext，React会向下自动传递参数，
  //任何组件只要在它的子组件中（这个例子中是Button），就能通过定义contextTypes来获取参数。
  //因为ES6明确规定，Class内部只有静态方法，没有静态属性,所以ES6在类中定义静态属性都是错误的。
  //安装babel-preset-stage-0 包含了0-3的stage，可根据需要添加，
  //不同的stage封装了不同的插件，官方推荐是使用stage-1
  static childContextTypes = ContextType;

  getChildContext() {
    return this.props.context;
  }

  render() {
    // NOTE: If you need to add or modify header, footer etc. of the app,
    // please do that inside the Layout component.
    return React.Children.only(this.props.children); //返回children里仅有的子级。否则抛出异常。
  }
}

export default App; //默认导出（类）
