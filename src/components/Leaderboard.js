import React, { Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component {
    render() {
        const { usersIds, users, authedUser } = this.props
        return (
            <div>
                <table>
                <caption>Leaderboard</caption>
                    <thead>
                        <tr>
                            <th>Position</th>
                            <th>Name</th>
                            <th>Questions</th>
                            <th>Answers</th>
                            <th>Total Score</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.usersIds.map((id) => (
                            <tr key={id} className={id===authedUser?'active-row':null}>
                                <td>{usersIds.indexOf(id)+1}</td>
                                <td><img
                                        src={users[id].avatarURL}
                                        alt={`Avatar of ${users[id].name}`}
                                        className='avatar'
                                    />
                                    <div>{users[id].name}</div>
                                </td>
                                <td>{users[id].questions.length}</td>
                                <td>{Object.keys(users[id].answers).length}</td>
                                <td>{users[id].questions.length + Object.keys(users[id].answers).length}</td>
                            </tr>                        
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

function mapStateToProps ({ users, authedUser }) {
    return {
        users,
        authedUser,
        usersIds: Object.keys(users)
            .sort((a,b) => (users[b].questions.length + Object.keys(users[b].answers).length) - (users[a].questions.length + Object.keys(users[a].answers).length))
    }
}

export default connect(mapStateToProps)(Leaderboard)