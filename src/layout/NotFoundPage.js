import React from "react";
import { Link} from "react-router-dom";


function NotFoundPage() {
  return (
    <div className="container">
      <h1>Oops!</h1>
      <h2>404 Not Found</h2>
      <div className="error-details">
        Sorry, an error has occured, Requested page not found!
      </div>
      <div className="error-actions">
        <Link  to="/" className="btn btn-primary btn-lg">
          <span className="glyphicon glyphicon-home"></span>
          Take Me Home{" "}
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
