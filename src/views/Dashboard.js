import Supervisor from './Supervisor'
import React from 'react'
import Salesrep from './Salesrep'
import Header from './Header'
import Manager from './Manager'
import Admin from './Admin'

const Dashboard = () => {
  if (!localStorage.getItem('access_token')) window.location.href = '/'

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
  }
  else if (localStorage.getItem('role') === 'Supervisor') {
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
export default Dashboard
