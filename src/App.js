import { BrowserRouter as Router,Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./layout/Login";
import Register from "./layout/Register";
function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
