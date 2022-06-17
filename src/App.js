import React from 'react';
import { Layout } from 'antd'
import {
  Route,
  Redirect,
  Switch,
  BrowserRouter
} from 'react-router-dom';
import { PrivateRoute } from './component/PrivateRoute'
import './App.scss'
import { Product } from './container/Product/Product'
import history from './helpers/history.js'

function App () {
  const ProductContainer = () => (
    <div className='container'>
      <Route exact path='/' render={() => <Redirect to='/productlist' />} />
      <Route exact path='/productlist' component={Product} />
    </div>
  )
  const DefaultContainer = () => (<Layout>
    <PrivateRoute exact path='/' component={ProductContainer} />
    </Layout>
    )
    
    return (
    <div className='App'>
      <BrowserRouter basename='/ReactUIAssignment' history={history}>
        <Switch>
          <Route exact path='/productlist' component={ProductContainer} />    
          <Route component={DefaultContainer} />     
        </Switch>
      </BrowserRouter>
    </div>
  )
}
export default App
