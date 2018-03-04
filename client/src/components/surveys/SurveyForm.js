// SurveyForm shows a from for a user to add input
import React, { Component} from 'react';
//reduxForm 帮助我们从底层的组件把数据传递到store再通过store传递到其他组件
// Field组件可以接受任何用户的输入
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField.js';
// 用第三方库lodash来帮助迭代
import _ from 'lodash';
import { Link} from 'react-router-dom';
import validateEmails from '../../utils/validateEmails.js';


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
    //reduxForm会把error传递给component
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
      //这个地方为什么不传递onSurveySubmit()，而是传递的函数呢
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">Cancel</Link>
          <button className="teal btn-flat right white-text" type="submit">Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    )
  }
}

function validate(values){
  const errors = {};
  //把这句验证放在前面可以避免对下面的 是否有邮件地址进行验证
  errors.emails = validateEmails(values.emails || '');
  
  _.each(FIELDS, ({name}) => {
    if(!values[name]){
      errors[name] = 'You must provide a value';
    }
  });


  return errors;
};

//把 SurveyForm传递给reduxForm
export default reduxForm({
  validate: validate,
  //这个地方的表单名字是为了区分不同表单，表单下的所有属性都在各自的表单名字下
  form: 'surveyForm',
  //在再次渲染表单组件的时候，保留上次所填写信息
  destroyOnUnmount: false
})(SurveyForm);
