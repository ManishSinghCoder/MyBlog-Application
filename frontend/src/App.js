
import Login from './Component/Login'
import SignUp from './Component/Signup'
import Home from './Component/Home'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Locaget ,Locg } from './actions/auth'
import React, {  useEffect } from 'react';
import Layout from './containers/Layout';
import Blog from './Component/Blog';
import Blogview from './Component/Blogview';
import { useDispatch } from 'react-redux'
import Blogupdate from './Component/Blogupdate';
import Content from './Component/Content'
import './Component/All.css'
import Allblogs from './Component/Allblogs';
import Contentid from './Component/Contentid';


function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(Locaget())
  }, [])
  const dspatch = useDispatch()
  useEffect(()=>
  {
    dspatch(Locg())
  },[])
  return (
    <div id="back">
    <Router>
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/Blog' component={Blog} />
          <Route exact path='/logview' component={Blogview} />
          <Route exact path='/blogupdate/:id' component={Blogupdate}/>
          <Route exact path='/Content/:id' component={Content}/>
          <Route exact path='/Allblogs' component={Allblogs}/>
          <Route exact path='/Contentid/:id' component={Contentid}/>
        </Switch>
      </Layout>
    </Router>
    </div>
  );
}

export default App;
