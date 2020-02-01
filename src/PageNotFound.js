import React from "react";
import {useHistory, useLocation} from 'react-router-dom';

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