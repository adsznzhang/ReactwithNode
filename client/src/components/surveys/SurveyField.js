//SurveyField contains logic to render a single
//label and text input

import React from 'react';


//可以使用({input}) => {
//console.log(input)
//}来把整个input对象传递给这个函数
export default ({input, label}) => {
  return (
    //...input作用是onBlur={input.onBlur} onFocus={input.onFocus}...
    <div>
      <label>{label}</label>
      <input {...input}/>
    </div>
  );
};
