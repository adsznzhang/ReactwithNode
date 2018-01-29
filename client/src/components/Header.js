import React, {Component} from 'react';
import {connect} from 'react-redux';

class Header extends Component{
  renderContent() {
    switch(this.props.auth){
      case null:
        return;
      case false:
        return <li><a href="/auth/google">Login With Google</a></li>;
      default:
        return <li><a>Logout</a></li>;


    }
  }

    render() {
      console.log(this.props)
      return (
        <div className="container">
          <nav>
            <div className="nav-wrapper">
              <a href="#" className=" left brand-logo">Emaily</a>
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
