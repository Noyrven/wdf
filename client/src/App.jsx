import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import RedirectPage from './Components/RedirectPage';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import Index from './Components/Routes/Index/Index';
import New from './Components/Routes/Index/New';
import PlaceShow from './Components/Routes/Show/PlaceShow';
import Register from './Components/Routes/Signing/Register';
import Logout from './Components/Routes/Signing/Logout';
import Login from './Components/Routes/Signing/Login';
import Edit from './Components/Routes/Index/Edit';
import NewComment from './Components/Routes/Show/NewComment'


const App = () => {
  
  return (
    <div>
      <Router>
        <Nav/>
        <Switch>
          <Route path='/places/' exact component={Index} />
          <Route path='/places/new/' component={New} />
          <Route path='/places/:id/' exact component={PlaceShow} />
          <Route path='/register/' exact component={Register} />
          <Route path='/logout/' exact component={Logout} />
          <Route path='/login/' exact component={Login} />
          <Route path='/places/:id/edit/'  component={Edit} />
          <Route path='/places/:id/comments/new/' component={NewComment} />
          <Route path='/' ecaxt component={RedirectPage} />
        </Switch>
        <Footer/>
      </Router>
    </div>
  )
}

export default App;
 