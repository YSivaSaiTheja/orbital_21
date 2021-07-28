import './App.css';
import { Container } from 'react-bootstrap';
import Navigation from './components/Navigation';
import Inputs from './components/Inputs';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HowToUse from './components/HowToUse';
import Login from './components/Login';
import Signup from './components/Signup';
import Plan from './components/Plan';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Container>
          <Navigation />
          <Switch>
            <Route path='/' exact component={Inputs}></Route>
            <Route path='/howtouse' component={HowToUse}></Route>
            <Route path='/login' component={Login}></Route>
            <Route path='/register' component={Signup}></Route>
            <Route path='/plan' component={Plan}></Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
