import React from 'react';
import Header from './components/Header';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home'
import FavPage from './components/FavPage'


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
              <FavPage />
            </Route>


          </Switch>
        </BrowserRouter>
      </>
    )
  }
}

export default App;
