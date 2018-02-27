// SurveyForm shows a from for a user to add input
import React, { Component} from 'react';
//reduxForm 帮助我们从底层的组件把数据传递到store再通过store传递到其他组件
// Field组件可以接受任何用户的输入
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField.js';
// 用第三方库lodash来帮助迭代
import _ from 'lodash';


const FIELDS = [
  {label: 'Survey Title', name: 'title'},
  {label: 'Subject Line', name: 'subject'},
  {label: 'Email Body', name: 'body' },
  {label: 'Recipient List', name: 'emails'}
];


class SurveyForm extends Component{

  //让组件变得简洁，把field做成函数
  renderFields() {
    return _.map(FIELDS, ({label, name}) => {
      return (<Field key={name} component={SurveyField} type="text" label={label} name={name} />);
    });


    /* return (
     *   //redux-form的Field组件可以来渲染我们自己创建的组件SurveyField,然后把Feild里面的方法对象也传递给这个组件
     *   <div>
     *     <Field label="Survey Title" type="text" name="title" component={SurveyField} />
     *     <Field label="Subject Line" type="text" name="subject" component={SurveyField} />
     *     <Field label="Email Body" type="text" name="body" component={SurveyField} />
     *     <Field label="Recipient List" type="text" name="emails" component={SurveyField} />
     *   </div>
     * )*/
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
