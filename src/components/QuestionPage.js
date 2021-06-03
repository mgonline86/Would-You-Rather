import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { Link, Redirect } from 'react-router-dom'

class QuestionPage extends Component {
    render() {
        const { id, questions, authedUser } = this.props

        if (typeof questions[id] === 'undefined') {
            return <Redirect to='/question-not-found' />
        }

        const { optionOne, optionTwo } = questions[id]

        return (
            <div>
                <Question id={id}/>
                {
                    (
                        optionOne.votes.includes(authedUser)
                        || optionTwo.votes.includes(authedUser)
                    )
                    && <Link 
                        to={'/'}
                        style={{
                            fontSize: '62px'
                        }}>&#8617;Back</Link>
                }
                
            </div>
        )
    }
}

function mapStateToProps ({authedUser, questions}, props) {
    const { id } = props.match.params

    return {
        id,
        authedUser,
        questions,
    }
}

export default connect(mapStateToProps)(QuestionPage)