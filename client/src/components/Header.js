import React, {Component} from 'react';

class Header extends Component{
    render() {
      return (
        <div className="container">
          <nav>
            <div className="nav-wrapper">
              <a href="#" className=" left brand-logo">Emaily</a>
              <ul id="nav-mobile" className="right">
                <li>
                  <a href="#">Login Wiht Google</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      );
    }
}


export default Header;
