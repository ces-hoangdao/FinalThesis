import React from "react";
import { Link} from "react-router-dom";


function NotFoundPage() {
  return (
    <div className="container">
      <h1>Oops!</h1>
      <h2>404 Not Found</h2>
      <div class="error-details">
        Sorry, an error has occured, Requested page not found!
      </div>
      <div class="error-actions">
        <Link  to="/" class="btn btn-primary btn-lg">
          <span class="glyphicon glyphicon-home"></span>
          Take Me Home{" "}
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
