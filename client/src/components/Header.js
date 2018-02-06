import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Payments from './Payments.js';

class Header extends Component{
  renderContent() {
    switch(this.props.auth){
      case null:
        return;
      case false:
        return <li><a href="/auth/google">Login With Google</a></li>;
      default:
        //react16才能正常运行
        return [
          <li key="1"><Payments/></li>,
          <li key="2"><a href="/api/logout">Logout</a></li>
        ];
    }
  }

    render() {
      console.log(this.props)
      return (
        <div className="container">
          <nav>
            <div className="nav-wrapper">
              <Link to={this.props.auth ? '/surveys' : '/'} className=" left brand-logo">Emaily</Link>
              <ul id="nav-mobile" className="right">
                {this.renderContent()}
              </ul>
            </div>
          </nav>
        </div>
      );
    }
}
// 遍历整个Store 找到auth属性
function mapStateToProps({auth}) {
  return {auth};
};

//把找到的auth状态传递给header
export default connect (mapStateToProps) (Header);
