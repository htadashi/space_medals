import logo from './logo.svg';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import LevelsMessage from './components/LevelsMessage';
import MinterComponent from './components/MinterComponent';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />  
      <LevelsMessage />
        <Container>
          <Row className="justify-content-md-center">
            <Col>
              <MinterComponent badgeSrc="badges/badge1.jpg" nLevels="1"/>
            </Col>
            <Col>
              <MinterComponent badgeSrc="badges/badge15.jpg" nLevels="15"/>
            </Col>
            <Col>
              <MinterComponent badgeSrc="badges/badge22.jpg" nLevels="23"/>
            </Col>
          </Row>
        </Container>          
      ※ Not affiliated, associated, authorized, endorsed by, or in any way officially connected with <a href="https://ethernaut.openzeppelin.com/">Ethernaut</a> and <a href="https://openzeppelin.com/">OpenZeppelin</a>
    </div>
  );
}

export default App;
