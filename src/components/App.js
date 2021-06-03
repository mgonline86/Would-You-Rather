import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom' 
import '../styles/App.css';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Home from './Home'
import LoadingBar from 'react-redux-loading'
import NewQuestion from './NewQuestion'
import QuestionPage from './QuestionPage'
import Leaderboard from './Leaderboard'
import Nav from './Nav'
import Error404 from './Error404'
import LoginPage from './LoginPage'

class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }
  render(){
    
  if(!this.props.authedUser) {
    return (
      <Fragment>
        <LoadingBar />
          <div className='container'>
          {this.props.loading === true
              ? null
              :
            <LoginPage />
          }
          </div>
      </Fragment>)
  }
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav />
            {this.props.loading === true
              ? null
              : <div>
                <Route path='/login' component={LoginPage} /> 
                  <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/questions/:id' exact component={QuestionPage} />
                    <Route path='/add' exact component={NewQuestion} />
                    <Route path='/leaderboard' exact component={Leaderboard} />
                    <Route component={Error404} />
                  </Switch>
                </div>
            }
          </div>
        </Fragment>
      </Router>

    );
  }
}

function mapStateToProps ({ authedUser, users }) {
  return{
    loading: users && Object.keys(users).length === 0 && users.constructor === Object,
    authedUser
  }
}

export default connect(mapStateToProps)(App);
