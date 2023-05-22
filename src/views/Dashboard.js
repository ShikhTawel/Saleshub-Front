import Supervisor from './Users/Supervisor'
import React, { useState } from 'react'
import Salesrep from './Users/Salesrep'
import Header from './Header'
import Manager from './Users/Manager'
import Admin from './Users/Admin'
import { useCustomAxios } from '../Hooks/useAxios'
import Notifications from './Modals/Notifications' 

const Dashboard = () => {
  if (!localStorage.getItem('access_token')) window.location.href = '/'
  let [isNotificationsOpen, SetIsNotificationsOpen] = useState(false)

  const notificationsResponse = useCustomAxios({
    method: 'GET',
    url: `/${localStorage.getItem('username')}/getNewNotifications`,
  })

  if (notificationsResponse.response?.length > 0 && localStorage.getItem('role') !== 'Admin') {
    isNotificationsOpen = true
    return (
      <>
        <Notifications
          notifications={notificationsResponse.response}
          isOpen={isNotificationsOpen}
          setIsOpen={SetIsNotificationsOpen}
        />
      </>
    )
  } else {
    if (localStorage.getItem('role') === 'Admin') {
      return (
        <>
          <div className={' bg-gray-50 w-full min-h-screen f-col-center'}>
            <div className={'w-full'}>
              <Admin />
            </div>
          </div>
        </>
      )
    } else if (localStorage.getItem('role') === 'Supervisor') {
      return (
        <>
          <div className={' bg-gray-50 w-full min-h-screen f-col-center'}>
            <Header></Header>
            <div className={'w-full'}>
              <Supervisor />
            </div>
          </div>
        </>
      )
    } else if (localStorage.getItem('role') === 'Manager') {
      return (
        <>
          <div className={' bg-gray-50 w-full min-h-screen f-col-center'}>
            <Header></Header>
            <div className={'w-full'}>
              <Manager />
            </div>
          </div>
        </>
      )
    } else {
      return (
        <>
          <div className={' bg-gray-50 w-full min-h-screen f-col-center'}>
            <Header></Header>
            <div className={'w-full'}>
              <Salesrep />
            </div>
          </div>
        </>
      )
    }
  }
}
export default Dashboard
