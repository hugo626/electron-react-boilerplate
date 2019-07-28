import React, { Component } from 'react';
import { NavLink  } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';

import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';

const { Sider } = Layout;

class Routes extends Component {
  static propTypes = {
  };

  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  onClickMenu = ({ item, key, keyPath, domEvent, dispatch }) => {
    switch (key) {
      case '1':
        console.log('Option 1'+history);
        break;
      case '2':
        console.log('Option 2');
        break;
      case '3':
        console.log('Option 3');
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1">
                <NavLink to={routes.HOME}>
                  <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" />
                  <span>to Home</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="2" >
                <NavLink to={routes.COUNTER}>
                  <Icon type="star" theme="twoTone" twoToneColor="#eb2f96" />
                  <span>to Counter</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="3" onClick={this.onClickMenu}>
                <NavLink to={routes.COUNTER}>
                  <Icon type="file" theme="twoTone" twoToneColor="#eb2f96"/>
                  <span>File</span>
                </NavLink>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Switch>
              <Route path={routes.COUNTER} component={CounterPage} />
              <Route path={routes.HOME} component={HomePage} />
            </Switch>
          </Layout>
        </Layout>
      </>
    );
  }
}

export default Routes;
