import React from 'react';
import { connect } from 'react-redux';
import FIELDS from './formFields.js';
import _ from 'lodash';
import * as actions from '../../actions';

//submitSurvey作为属性传递给组件
const SurveyFormReview = ({onCancel, formValues, submitSurvey}) => {

  const reviewFields = _.map(FIELDS, ({name, label}) => {
    return (
      <div key={name}>
        <label >{label}</label>
        <div>
          {formValues[name]}
        </div>
      </div>
    );
  })

  return (
    //为了防止submitSurvey直接执行，我们用箭头函数进行返回
    <div>
      <h5>Plese confirm your entries</h5>
      {reviewFields}
      <button className="yellow white-text darken-2 btn-flat" onClick={onCancel}>Back</button>
      <button onClick={() => submitSurvey(formValues)} className="green btn-flat right white-text">
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
}

//在redux store中获取数据 函数名字不重要！
function mapStateToProps(state){
  //console.log(state);
  return{
    formValues:state.form.surveyForm.values
  }
};

export default connect(mapStateToProps, actions)(SurveyFormReview);
