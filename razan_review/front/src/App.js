import React from 'react';
import Header from './components/Header';
import Home from './components/Home';
import FavoriteRecipes from './components/FavoriteRecipes';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';



class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <BrowserRouter>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/favorite'>
              <FavoriteRecipes />
            </Route>
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}

export default App;
