/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* 将package.json文件添加到每个组件的文件夹中。

这将允许从代码中的其他位置轻松引用这些组件。 使用import Nav from '../Navigation'，而不是import Nav from '../Navigation/Navigation.js'*/

import React from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import Link from '../Link';
//classNames('foo', 'bar'); // => 'foo bar'
//classNames用于减少style的判断，尤其是在react里面特别需要，像其他的mvvm自带判断函数

class Navigation extends React.Component {
  render() {
    return (
      <div className={s.root} role="navigation">
        <Link className={s.link} to="/about">
          About
        </Link>
        <Link className={s.link} to="/contact">
          Contact
        </Link>
        <span className={s.spacer}> | </span>
        <Link className={s.link} to="/login">
          Log in
        </Link>
        <span className={s.spacer}>or</span>
        <Link className={cx(s.link, s.highlight)} to="/register">
          Sign up
        </Link>
      </div>
    );
  }
}

export default withStyles(s)(Navigation);
