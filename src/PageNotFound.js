import React from "react";
import {useHistory, useLocation} from 'react-router-dom';

/*
Page when you try to go to any page that doesn't exist it will redirect you to the dashboard
*/
export default function NotFound() {

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/dashboard" } };
    history.replace(from);

  return (
    <div className="NotFound">
    </div>
  );
}