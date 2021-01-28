import { BrowserRouter as Router} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './layout/Login';
function App() {
  return (
    <Router>
    <Header />
    <main className='py-3'>
      <Container>
       
       <Login></Login>
    
      </Container>
    </main>
    <Footer/>
  </Router>
  );
}

export default App;
