// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component} from 'react';
import SurveyForm from './SurveyForm.js';
import SurveyFormReview from './SurveyFormReview.js';

class SurveyNew extends Component{
    //经典的组件状态初始化
    // constructor(props){
    //     super(props);

    //     this.state = {new: true};
    // }

    state = {showFormReview: false};

  renderContent() {
    if (this.state.showFormReview === true){
      return <SurveyFormReview onCancel={() => this.setState({showFormReview: false})}/>
    }
    return <SurveyForm onSurveySubmit={() => this.setState({showFormReview: true})}/>
  }

    render(){
      return (
        <div className="container">
          {this.renderContent()}
        </div>
      );
    }
}

export default SurveyNew;
