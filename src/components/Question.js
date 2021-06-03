import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleAnswerQuestion } from '../actions/shared'
import { Link, withRouter, Redirect } from 'react-router-dom'

class Question extends Component {
    handleAnswer = (e, answer) =>{
        e.preventDefault()

        const { dispatch, question, authedUser} = this.props

        dispatch(handleAnswerQuestion({
            authedUser,
            qid: question.id,
            answer
        }))
    }
    formatDate = (timestamp) => {
        const dateObject = new Date(timestamp)
        const humanDateFormat = dateObject.toLocaleString()
        return humanDateFormat
    }
    render() {
        const { question, users, authedUser, location } = this.props
        
        if (typeof question === 'undefined') {
            return <Redirect to='/question-not-found' />
        }
        
        const {
            author,
            optionOne,
            optionTwo,
            timestamp,
            id,
        } = question

        return (
            <Link to={`/questions/${id}`} className='question'>
                <div>
                    <img
                        src={users[author].avatarURL}
                        alt={`Avatar of ${users[author].name}`}
                        className='avatar'
                    />
                    <div style={{margin:'20px'}}>by: {users[author].name}</div>
                    <div>{this.formatDate(timestamp)}</div>
                </div>
                <div className='question-info'>
                    <h1>Would You Rather</h1>
                    <div className='question-options'>
                        <div className='optionOne'>
                            <button
                                className={
                                    `opt-btn
                                        ${(location.pathname === `/questions/${id}` 
                                            && !(optionOne.votes.includes(authedUser)) 
                                            && !(optionTwo.votes.includes(authedUser))) 
                                            ? 'plain-btn':null} 
                                        ${
                                            optionOne.votes.includes(authedUser)?
                                            'choosen-btn'
                                            :optionTwo.votes.includes(authedUser)?
                                            'unchoosen-btn':null
                                        }`
                                }
                                disabled={
                                    optionOne.votes.includes(authedUser)
                                    || optionTwo.votes.includes(authedUser)
                                }
                                onClick={location.pathname === `/questions/${id}` 
                                ? (event)=>this.handleAnswer(event, 'optionOne')
                                :null}
                            >
                                    {optionOne.text}
                            </button>
                            {(optionOne.votes.includes(authedUser)
                                || optionTwo.votes.includes(authedUser))
                                &&
                                <Fragment>
                                <span>votes: {optionOne.votes.length}</span>
                                <span>
                                    {
                                        (
                                            (
                                                optionOne.votes.length/
                                                ( optionOne.votes.length + optionTwo.votes.length)
                                            )*100
                                        ).toFixed()
                                    }%
                                </span>
                            </Fragment>
                            }
                        </div>
                        <div className='optionTwo'>
                            <button
                                className={
                                    `opt-btn
                                    ${(location.pathname === `/questions/${id}` 
                                        && !(optionOne.votes.includes(authedUser)) 
                                        && !(optionTwo.votes.includes(authedUser))) 
                                        ? 'plain-btn':null}
                                    ${
                                        optionTwo.votes.includes(authedUser)?
                                        'choosen-btn'
                                        :optionOne.votes.includes(authedUser)?
                                        'unchoosen-btn':null
                                    }`
                                    
                                }
                                disabled={
                                    optionOne.votes.includes(authedUser)
                                    || optionTwo.votes.includes(authedUser)
                                }
                                onClick={location.pathname === `/questions/${id}` 
                                ? (event)=>this.handleAnswer(event, 'optionTwo')
                                :null}
                            >
                                {optionTwo.text}
                            </button>
                            {(optionOne.votes.includes(authedUser)
                                || optionTwo.votes.includes(authedUser))
                                &&
                                <Fragment>
                                <span>votes: {optionTwo.votes.length}</span>
                                <span>
                                    {
                                        (
                                            (
                                                optionTwo.votes.length/
                                                ( optionOne.votes.length + optionTwo.votes.length)
                                            )*100
                                        ).toFixed()
                                    }%
                                </span>
                            </Fragment>
                            }
                            
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
}

function mapStateToProps ({authedUser, users ,questions}, { id }) {
    const question = questions[id]

    return{
        authedUser,
        question,
        users
    }
}

export default withRouter(connect(mapStateToProps)(Question))