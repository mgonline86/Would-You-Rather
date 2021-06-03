import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleLoginUser } from '../actions/authedUser'

class Nav extends Component {
     
  handleLogout = (e) => {
    e.preventDefault()

    const{ dispatch, history } = this.props

    history.push('/');

    dispatch(handleLoginUser(null))
    
}

  render(){
    const { users, authedUser } = this.props
    return (
      <nav className='nav'>
        <ul>
          <div className='nav-left'>
            <li>
              <NavLink to='/' exact activeClassName='active'>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to='/add' activeClassName='active'>
                Add Question
              </NavLink>
            </li>
            <li>
              <NavLink to='/leaderboard' activeClassName='active'>
                Leaderboard
              </NavLink>
            </li>
          </div>
          <div className='nav-right'>
            <li>
              <a style={{ cursor: 'default' }}>
                <img
                      src={users[authedUser].avatarURL}
                      alt={`Avatar of ${users[authedUser].name}`}
                      className='avatar'
                  />
              </a>
            </li>
            <li>
              <a style={{ cursor: 'default' }}>
              {users[authedUser].name}
              </a>
            </li>
            <li>
              <a style={{ color: 'red' }} onClick={this.handleLogout}>
                Logout
              </a>
            </li>
          </div>
        </ul>
      </nav>
    )
  }
}

function mapStateToProps({users, authedUser}) {
  return {
      users,
      authedUser
  }
}

export default withRouter(connect(mapStateToProps)(Nav))