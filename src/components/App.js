import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import './App.css'
import Header from '../routes/Header';
import About from '../containers/About'
import Login from '../containers/Login'
import Signup from '../containers/Signup'
import UserProfile from '../containers/users/UserProfile';
import Followers from '../containers/users/Followers';
import Following from '../containers/users/Following';
import AllProfiles from '../containers/users/AllProfiles';
import RecipesContainer from './RecipesContainer'
import Footer from '../routes/Footer';
import Home from './common/Home';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons'

library.add(faEnvelope, faKey)

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <Header />
//         <Main />
//       </div>
//     );
//   }
// }

// export default App


class App extends Component {
  render() {
    const {isAuthenticated, currentUser} = this.props

    const guestViews = (
      <div id="landing-page" className="wrapper">
        <Header isAuthenticated={isAuthenticated} />
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Footer/>
      </div>
    )

    const userViews = (
      <div className="wrapper">
        <Header isAuthenticated={isAuthenticated} currentUser={currentUser} />
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/user_profile" render={() => <UserProfile currentUser={currentUser}/>} />
        <Route exact path="/followers" render={() => <Followers currentUser={currentUser}/>} />
        <Route exact path="/following" render={() => <Following currentUser={currentUser}/>} />
        <Route path='/recipes_container/:id' exact component={RecipesContainer} />
        <Route exact path="/all_profiles" render={() => <AllProfiles currentUser={currentUser} />} />
        <Footer/>
      </div>
    )

    return (
      <Router>
        {isAuthenticated ? userViews : guestViews}
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    currentUser: state.auth.currentUser
  }
}

export default App = connect(mapStateToProps, {})(App);

