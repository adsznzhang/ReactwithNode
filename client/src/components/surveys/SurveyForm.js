// SurveyForm shows a from for a user to add input
import React, { Component} from 'react';
//reduxForm 帮助我们从底层的组件把数据传递到store再通过store传递到其他组件
// Field组件可以接受任何用户的输入
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField.js';
class SurveyForm extends Component{

  //让组件变得简洁，把field做成函数
  renderFields() {
    return (
      <div>
        <Field type="text" name="title" component={SurveyField} />
      </div>
    )
  }

    render(){
        return (
            // name属性可以是任何,component属性告诉redux-form这是一个类似<input />的HTML标记
          <div>
            <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
              {this.renderFields()}
            <button type="submit">Submit</button>
            </form>
          </div>
        )
    }
}


//把 SurveyForm传递给reduxForm
export default reduxForm({
  form: 'surveyForm'
})(SurveyForm);
