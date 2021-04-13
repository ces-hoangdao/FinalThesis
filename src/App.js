import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer/Footer";
import Login from "./layout/Login";
import Register from "./layout/Register";
import EditProfile from "./layout/EditProfile";
import ListHouse from "./layout/ListHouse";
import Home from "./layout/Home";
import About from "./layout/About";
import HouseDetail from "./components/HouseDetails/HouseDetail";
import HouseManage from "./components/HouseManage/HouseManage";
import ConfirmCode from "./layout/ConfirmCode";
import NotFoundPage from "./layout/NotFoundPage"

import PostHouse from "./layout/PostHouse";
import EditHouse from "./layout/EditHouse";
function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/about" component={About} />
          <Route path="/listhouse" component={ListHouse} />
          <Route path="/posthouse" component={PostHouse} />
          <Route path="/housemanage" component={HouseManage} />
          <Route path="/edithouse/:id" component={EditHouse} />    
          <Route path="/housedetail/:id" component={HouseDetail} />
          <Route path="/editprofile" component={EditProfile}/>
          <Route path="/confirmcode" component={ConfirmCode}/>
          <Route path='/' component={Home} exact />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
