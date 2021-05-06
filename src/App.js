import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer/Footer";
import Login from "./layout/Login";
import Register from "./layout/Register";
import EditProfile from "./containters/EditProfile/EditProfile";
import Home from "./layout/Home";
import About from "./layout/About";
import NotFoundPage from "./layout/NotFoundPage";
import BookingHistory from "./containters/BookingHistory/BookingHistory";
import HouseDetail from "./containters/HouseDetails/HouseDetail";
import ConfirmCode from "./layout/ConfirmCode";
import AddHouse from "./containters/AddHouse/AddHouse";

import ListHouse from "./containters/ListHouse/ListHouse";
function App() {
  return (
    <Router>
      <Header />
      <main>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/about" component={About} />
        <Route path="/listhouse" component={ListHouse} />
        <Route path="/AddHouse" component={AddHouse} />
        <Route path="/housedetail/:id" component={HouseDetail} />
        <Route path="/editprofile" component={EditProfile} />
        <Route path="/confirmcode" component={ConfirmCode} />
        <Route path="/notfoundpage" component={NotFoundPage} />
        <Route path="/bookinghistory" component={BookingHistory} />
        <Route path="/" component={Home} exact />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
