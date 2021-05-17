import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Admin from "./components/Admin/Admin";
import EditProfile from "./containters/EditProfile/EditProfile";
import About from "./components/About/About";
import NotFoundPage from "./layout/NotFoundPage";
import BookingHistory from "./containters/BookingHistory/BookingHistory";
import ConfirmCode from "./layout/ConfirmCode";
import AddHouse from "./containters/AddHouse/AddHouse";
import HostManage from "./components/HostManage/HostManage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./containters/Home/Home";
import Login from "./containters/Login/Login";
import Register from "./containters/Register/Register";
import ListHouse from "./containters/ListHouse/ListHouse";
import HouseDetail from "./containters/HouseDetails/HouseDetail";
import EditHouse from "./containters/EditHouse/EditHouse";
import HostRegister from "./containters/HostRegister/HostRegister";




import "./App.css";

function App() {
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  if (isAdmin) {
    return (
      <div>
        <Router>
          <Route path="/" component={Admin} />
        </Router>
      </div>
    );
  }
  return (
    <Router>
      <Header />
      <main className="MainBackGroundColor">
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/listhouse" component={ListHouse} />
        <Route path="/housedetail/:id" component={HouseDetail} />
        <Route path="/about" component={About} />
        <Route path="/posthouse" component={AddHouse} />
        <Route path="/edithouse/:id" component={EditHouse} />
        <Route path="/editprofile" component={EditProfile} />
        <Route path="/confirmcode" component={ConfirmCode} />
        <Route path="/notfoundpage" component={NotFoundPage} />
        <Route path="/bookinghistory" component={BookingHistory} />
        <Route path="/hostregister" component={HostRegister} />

        <Route path="/hostmanage" component={HostManage} />
      </main>
      <Footer />
    </Router>
  );
}
export default App;
