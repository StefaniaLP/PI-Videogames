import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./components/LandingPage/Landing";
import Home from "./components/Home/Home";
//import Detail from "./components/Detail/Detail";
import Form from "./components/Form/Form";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing}/>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/videogames" component={Form}/>
          
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;
