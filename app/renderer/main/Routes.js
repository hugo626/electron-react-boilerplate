import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Route, Switch} from 'react-router';
import {Icon, Layout, Menu} from 'antd';

import routes from '../shared/constants/routes';
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
              <Menu.Item key="3" >
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
