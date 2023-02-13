import './App.css'

import { HashRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './views/Dashboard'
import Login from './views/Login'

function App() {
  // var hours = 12 // to clear the localStorage after 1 hour
  // // (if someone want to clear after 8hrs simply change hours=8)
  // var now = new Date().getTime()
  // var setupTime = localStorage.getItem('setupTime')
  // console.log("Clearing");
  // if (setupTime == null) {
  //   localStorage.setItem('setupTime', now)
  // } else {
  //   if (now - setupTime > hours * 60 * 60 * 1000) {
  //     localStorage.clear()
  //     sessionStorage.clear()
  //     localStorage.setItem('setupTime', now)
  //   }
  // }

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
