import React, {Component} from 'react';
import { connect} from 'react-redux';
import {fetchSurveys} from '../../actions';


class SurveyList extends Component {

  //每次组件渲染的时候调用这个action函数
  componentDidMount(){
    this.props.fetchSurveys();
  }

  renderSurveys(){
    return this.props.surveys.reverse().map(survey => {
      return (
        <div className="card blue-grey darken-1" key={survey._id}>
          <div className="card-content white-text">
            <span className="card=title">{survey.title}</span>
            <p>
              {survey.body}
            </p>
            <p className="right">
              Send On: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            <a href="">YES: {survey.yes}</a>
            <a href="">NO: {survey.no}</a>
          </div>
        </div>
      )
    })
  }

  render(){
    return (
      <div>
        {this.renderSurveys()}
      </div>
    )
  }
}

function mapStateToProps({surveys}){
  // 在reducer我们把属性定义为了surveys所以要用state.surveys
  return {surveys};
};

export default connect(mapStateToProps,{fetchSurveys})(SurveyList);
