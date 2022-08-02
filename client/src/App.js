//import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./components/LandingPage/Landing";
import Home from "./components/Home/Home";
import Detailok from "./components/Detail/Detailok";
import Form from "./components/Form/Form";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing}/>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/videogames" component={Form}/>
          <Route exact path="/videogames/:id" component={Detailok}/>
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;
