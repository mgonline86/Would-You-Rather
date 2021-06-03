import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class Home extends Component {
    state = {
        tab : 'unanswered',
        answeredQs: [],
        unansweredQs: []
    }
    
    switchTab = (tab) => {
        switch (tab) {
            case 'answered':
                this.setState(() => ({
                    tab: 'answered'
                }))  
                break;              
            default:
                this.setState(() => ({
                    tab: 'unanswered'
                }))
        }
    }

    componentDidMount(){
        const { questions, questionsIds, authedUser } = this.props
        const answeredQs = this.props.questionsIds.filter((id) =>(
            questions[id].optionOne.votes.includes(authedUser)
            || questions[id].optionTwo.votes.includes(authedUser)
            ))
        const unansweredQs = questionsIds.filter((id) =>(
            !questions[id].optionOne.votes.includes(authedUser)
            && !questions[id].optionTwo.votes.includes(authedUser)
            ))

        this.setState(() => ({
            answeredQs,
            unansweredQs,
        }))
      }

    render() {
        const { tab, answeredQs, unansweredQs } = this.state
        return (
            <div className='tabs-container'>
                    <div className='tabs'>
                        <h3 onClick={()=>this.switchTab('unanswered')} className={this.state.tab === 'answered'?'inactive-tab':null}>Unanswered Questions</h3>
                        <h3 onClick={()=>this.switchTab('answered')} className={this.state.tab === 'unanswered'?'inactive-tab':null}>Answered Questions</h3>
                    </div>
                    
                    <ul className='questions-list'>
                        {
                            (tab === 'unanswered' && unansweredQs.length===0)
                            ||(tab === 'answered' && answeredQs.length===0)
                            ?<div className='no-qs'>No Questions Here!</div>
                            :(tab === 'unanswered'
                            ? unansweredQs
                            : answeredQs
                            ).map((id) => (
                                <li key={id}>
                                    <Question id={id} />
                                </li>
                            ))
                        }
                    </ul>
        </div>
        )
    }
}

function mapStateToProps ({ authedUser, questions }) {
    return {
        authedUser,
        questions,
        questionsIds: Object.keys(questions)
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    }
}

export default connect(mapStateToProps)(Home)