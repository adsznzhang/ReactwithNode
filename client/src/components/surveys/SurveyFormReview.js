import React from 'react';
import { connect } from 'react-redux';

const SurveyFormReview = ({onCancel, formValues}) => {
  return (
    <div>
      <h5>Plese confirm your entries</h5>
      <div>
        <div>
          <label >Survey Title</label>
          <div>
            {formValues.title}
          </div>
        </div>
      </div>
      <button className="yellow darken-3 btn-flat" onClick={onCancel}>Back</button>
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

export default connect(mapStateToProps)(SurveyFormReview);
