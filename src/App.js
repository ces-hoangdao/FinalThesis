import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer/Footer";
import Login from "./layout/Login";
import Register from "./layout/Register";
import ListHouse from "./layout/ListHouse";
import Home from "./layout/Home";
import About from "./layout/About";
import HouseDetail from "./components/HouseDetails/HouseDetail";
import HouseManage from "./components/HouseManage/HouseManage";
import ConfirmCode from "./layout/ConfirmCode";
import NotFoundPage from "./layout/NotFoundPage"

function App() {
  return (
    <Router>
      <Header />

      <main >
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/about" component={About} />
        <Route path="/listhouse" component={ListHouse} />
        <Route path="/housemanage" component={HouseManage} />
        <Route path="/housedetail/:id" component={HouseDetail} />
        <Route path="/confirmcode" component={ConfirmCode} />
        <Route path="/notfoundpage" component={NotFoundPage} />
        <Route path="/" component={Home} exact />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
