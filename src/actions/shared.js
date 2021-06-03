import * as API from '../utils/_DATA'
import { receiveUsers } from './users'
import { receiveQuestions } from './questions'
import { setAuthedUser } from './authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'

function addQuestion (question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { authedUser } = getState()

        dispatch(showLoading())

        return API._saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser,
        })
        .then((question) => dispatch(addQuestion(question)))
        .then(() => dispatch(hideLoading()))
    }
}

export function handleInitialData () {
    return (dispatch) => {
        dispatch(showLoading())
        return (API._getUsers()
            .then((users) => {
                dispatch(receiveUsers(users))
            }), API._getQuestions()
            .then((questions) => {
                dispatch(receiveQuestions(questions))
                dispatch(setAuthedUser(''))
                dispatch(hideLoading())
            }))
    }
}

function answerQuestion({ authedUser, qid, answer }) {
    return {
        type: ANSWER_QUESTION,
        qid,
        authedUser,
        answer,
    }
}

export function handleAnswerQuestion(info) {
    return (dispatch) => {
        dispatch(answerQuestion(info))

        return API._saveQuestionAnswer(info)
            .catch((e) => {
                console.warn('Error in hanleAnswerQuestion', e)
                alert('There was an error submiting the answer, Try again.')
            })
    }
}