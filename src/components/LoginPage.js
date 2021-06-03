import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleLoginUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'

class LoginPage extends Component {
    state = {
        userId: '',
        toHome: false,
    }

    handleSelectChange = (e) => {
        const userId = e.target.value

        this.setState(() => ({
            userId
        }))
    }
    
    handleLogin = (e) => {
        e.preventDefault()

        const{ dispatch } = this.props

        dispatch(handleLoginUser(this.state.userId))

        this.setState(() => ({
            toHome: true
        }))
    }

    render() {
        const { userId, toHome} = this.state
        if (toHome === true) {
            return <Redirect to='/' />
        }
        const { users, usersIds } = this.props
        return (
                <div className='login-container'>
                    <h1>Would You Rather?</h1>
                    <form onSubmit={this.handleLogin}>
                        <select
                            onChange={this.handleSelectChange} 
                            defaultValue="Select User"
                            >
                                <option disabled value="Select User">Select User</option>
                                {usersIds.map((id) => (
                                    <option key={id} value={users[id].id}>{users[id].name}</option>
                                ))}
                        </select>
                        <button
                            className='btn'
                            style={{margin:'0'}}
                            type='submit'
                            disabled={userId === ''}
                        >
                            Login
                        </button>
                    </form>
                </div>
        )
    }
}

function mapStateToProps({users}) {
    return {
        users,
        usersIds: Object.keys(users)
    }
}

export default connect(mapStateToProps)(LoginPage)