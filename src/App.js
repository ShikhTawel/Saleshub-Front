import './App.css'

import { HashRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './views/Dashboard'
import Login from './views/Login'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </HashRouter>
  )
}

export default App
