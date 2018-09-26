import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,  
  Switch
} from 'react-router-dom';
import {Provider} from 'react-redux';
import './App.css';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import Landing from './components/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import store from './store';
import Dashboard from './components/dashboard/Dashboard';
import UserHelper from './utils/UserHelper';
import PrivateRoute from './components/ui/PrivateRoute';
import EditProfile from './components/dashboard/EditProfile';
import NotFound from './components/ui/NotFound';
import AddEducation from './components/profile/AddEducation';
import Profile from './components/profile/Profile';
import FlashAlert from './components/ui/FlashAlert';
import AddExperience from './components/profile/AddExperience';
import ProfileList from './components/profile/ProfileList';
import Posts from './components/posts/Posts';

UserHelper.setCurrentUserFromLocalStorage(store);

class App extends Component {
  render() {
    return <Provider store={store}>
        <div className="App">
          <BrowserRouter>
            <div>
              <NavBar />
              <div className="container">
                <div className="row" >
                  <div className="col-md-12">
                    <FlashAlert />
                    <Switch>
                      <Route exact path="/" component={Landing} />
                      <Route path="/register" component={Register} />
                      <Route path="/login" component={Login} />
                      <Route path="/profile/:handle" component={Profile} />
                      <Route path="/profiles" component={ProfileList} />
                      <Route path="/posts" component={Posts} />

                      <PrivateRoute exact path="/dashboard" component={Dashboard} />
                      <PrivateRoute exact path="/edit-profile" component={EditProfile} />
                      <PrivateRoute exact path="/create-profile" component={EditProfile} />
                      <PrivateRoute exact path="/add-education" component={AddEducation} />
                      <PrivateRoute exact path="/add-experience" component={AddExperience} />
                    </Switch>
                  </div>
                </div>
              </div>              
            </div>
          </BrowserRouter>
          <Footer />
        </div>
      </Provider>;
  }
}

export default App;
