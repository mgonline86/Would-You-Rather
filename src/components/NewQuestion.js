import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/shared'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
        toHome: false,
    }

    handleOptionOneChange = (e) => {
        const optionOne = e.target.value

        this.setState(() => ({
            optionOne
        }))
    }
    handleOptionTwoChange = (e) => {
        const optionTwo = e.target.value

        this.setState(() => ({
            optionTwo
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { optionOne, optionTwo } = this.state

        const { dispatch } = this.props

        dispatch(handleAddQuestion(optionOne,optionTwo))
        .then(()=> this.setState(() => ({
            optionOne: '',
            optionTwo: '',
            toHome: true
        })))

       
    }

    render() {
        const { optionOne, optionTwo , toHome } = this.state

        if (toHome === true) {
            return <Redirect to='/' />
        }

        return (
            <div>
                <h3 className='center'>Compose new Question</h3>
                <h1>Would You Rather</h1>
                <form className='new-question' onSubmit={this.handleSubmit}>
                    <label>Option One</label>
                    <textarea
                        placeholder='Option One'
                        value={optionOne}
                        onChange={this.handleOptionOneChange}
                        className='textarea'
                        maxLength={100}
                    />
                    <div className='question-length'>
                        {100 - optionOne.length}
                    </div>
                    <label>Option Two</label>
                    <textarea
                        placeholder='Option Two'
                        value={optionTwo}
                        onChange={this.handleOptionTwoChange}
                        className='textarea'
                        maxLength={100}
                    />
                    <div className='question-length'>
                        {100 - optionTwo.length}
                    </div>
                    <button
                        className='btn'
                        type='submit'
                        disabled={optionOne === '' || optionTwo === ''}
                    >
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

export default connect()(NewQuestion)