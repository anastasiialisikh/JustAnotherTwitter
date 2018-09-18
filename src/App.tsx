import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SecuredRoute } from './components/SecuredRoute';

import './App.scss';
import './assets/styles/common.scss';

import { Authentication } from './pages/Authentication';
import { Home } from './pages/Home';
import { User } from './pages/User';

import { observer, inject } from 'mobx-react';

interface IAppProps {
  stores?: any;
}

@inject('stores')
@observer
export default class App extends React.Component<IAppProps, {}> {
  constructor(props: IAppProps) {
    super(props);
    /*******just for the first launch after change***********/
    localStorage.removeItem('userDetails');
    localStorage.removeItem('token');
    /******************************************/
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    userDetails && (this.props.stores.userDetails.user = userDetails);
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <SecuredRoute
              component={Home}
              exact
              path="/"
              guard={this.props.stores.userDetails.user}
            />

            <SecuredRoute
              component={User}
              path="/profile"
              guard={this.props.stores.userDetails.user}
            />

            <Route path="/login" component={Authentication} />
          </Switch>
        </Router>
      </div>
    );
  }
}
