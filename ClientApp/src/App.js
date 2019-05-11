import React from 'react';
import { Route} from 'react-router';
import { connect } from 'react-redux';
import './App.css';
import Home from './components/Home/Home';
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import CreateTravel from './components/PageCreateTravel/CreateTravel';
import PersonalPage from './components/PagePersonal/PersonalPage';
import Places from './components/PagePlaceToVisit/Places';
import CreatePlace from './components/PagePlaceToVisit/CreatePlace/CreatePlace';
import { withRouter } from 'react-router';
import Layout from './components/Layout';

class App extends React.Component {
  render() {
      return (
          <Layout>
              <Route path='/' exact component={Home} />
              <Route path='/login' component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/createtravel" component={CreateTravel} />
              <Route path="/createplace" component={CreatePlace} />
              <Route path="/mustvisit" component={Places} />
              <Route path="/personalpage" component={PersonalPage} />
          </Layout>  
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
      alert
  };
}

const connectedApp = withRouter(connect(mapStateToProps)(App));

export { connectedApp as App};