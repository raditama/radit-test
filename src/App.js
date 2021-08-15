import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './pages/home/index';
import GoldPrice from './pages/gold-price/index';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/gold-price">
            <GoldPrice />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
