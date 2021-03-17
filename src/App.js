import { BrowserRouter as Router,Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./layout/Login";
import Register from "./layout/Register";
import EditProfile from "./layout/EditProfile";
import HomeList from "./layout/HomeList";
import Home from "./layout/Home";
import About from "./layout/About";
import HouseDetail from "./components/HouseDetails/HouseDetail";
import ConfirmCode from "./layout/ConfirmCode";
function App() {
  return (
    <Router>
      <Header />
     
      <main className="">
        
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/about" component={About} />
          <Route path="/homelist" component={HomeList} />
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
