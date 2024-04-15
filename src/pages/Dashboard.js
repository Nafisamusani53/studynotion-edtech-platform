import React from 'react'
import Sidebar from '../components/core/DashboardPage/Sidebar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        <div className='hidden md:block'>
        <Sidebar/>
        </div>
        <main className='w-screen h-[calc(100vh-3.5rem)] flex-1 overflow-auto'>
          <Outlet/>
        </main>
        
    </div>
  )
}

export default Dashboard
