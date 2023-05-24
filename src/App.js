import './App.css'

import { HashRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './views/Dashboard'
import Login from './views/Login'
import ResetPassword from './views/ResetPassword'
import VerifyPassword from './views/VerifyPassword'
import ResetUserPassword from './views/Administrator/ResetUserPassword'
import UploadData from './views/Administrator/UploadData'
import RemovePenalty from './views/Administrator/RemovePenalty'
import RemoveUser from './views/Administrator/RemoveUser'
import ViewComplainsAndSuggestions from './views/Administrator/ViewComplainsAndSuggestions'
import ViewResetPasswordRequests from './views/Administrator/ViewResetPasswordRequests'
import NavigateToUser from './views/Administrator/NavigateToUser'
import SendNotification from './views/Administrator/SendNotifications'
import ViewAllSentNotifications from './views/Administrator/ViewAllSentNotifications'
import DownloadData from './views/Administrator/DownloadData'

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
        
        <Route path="/reset-user-password" element={<ResetUserPassword />} />
        <Route path="/reset-requests" element={<ViewResetPasswordRequests />} />

        <Route path="/upload-data" element={<UploadData />} />
        <Route path="/download-data" element={<DownloadData />} />

        <Route path="/remove-penalty" element={<RemovePenalty />} />
        <Route path="/remove-user" element={<RemoveUser />} />
        <Route path="/view-feedback" element={<ViewComplainsAndSuggestions />} />
        <Route path="/navigate" element={<NavigateToUser />} />
        <Route path="/send-notification" element={<SendNotification />} />
        <Route path="/view-notifications" element={<ViewAllSentNotifications />} />

        <Route path="/" element={<Login />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/verify" element={<VerifyPassword />} />
      </Routes>
    </HashRouter>
  )
}

export default App
