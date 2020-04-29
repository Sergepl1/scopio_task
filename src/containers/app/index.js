import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import Country from '../country'

const App = () => (
  <div>
    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/country/:slug" component={Country} />
    </main>
  </div>
)

export default App
