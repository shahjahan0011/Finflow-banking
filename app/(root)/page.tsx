import RightSidebar from '@/components/RightSidebar'
import HeaderBox from '@/components/ui/HeaderBox'
import TotalBalanceBox from '@/components/ui/TotalBalanceBox'
import React from 'react'

const Home = () => {

  const loggedIn = { firstName :'Jahan', lastName:'Shah', email:'contact@jahanshah.com'} 

  return (
    <section className="home">
    <div className="home-content">
      <header className="home-header">
        <HeaderBox 
          type="greeting"
          title="Welcome"
          user={loggedIn?.firstName || 'Guest'}
          subtext="Access and manage your account and trasactions effectively."
        />

        <TotalBalanceBox
          accounts={[]}
          totalBanks={1}
          totalCurrentBalance={1023.45}
        />
      </header>

      RECENT TRANSACTIONS
      </div>

        <RightSidebar 
          user = {loggedIn}
          transactions={[]}
          banks={[{currentBalance:432.50},{currentBalance:450.60}]}
        />

      </section>
  )
}

export default Home