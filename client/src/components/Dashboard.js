import {Link} from 'react-router-dom';
import React from 'react';

const Dashboard = () => {
    return (
      <div className="container">
        Dashboard
        <div className="fixed-action-btn">
          <Link to="/surveys/new" className="btn-floating btn-large red">
            <i className="material-icons">add</i>
          </Link>
        </div>
      </div>
    );
}

export default Dashboard;
