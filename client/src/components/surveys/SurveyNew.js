// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component} from 'react';
import SurveyForm from './SurveyForm.js';

class SurveyNew extends Component{
    render(){
      return (
        <div className="container">
          <SurveyForm />
        </div>
      )
    }
}

export default SurveyNew;
