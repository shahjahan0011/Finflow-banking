import RecentTransactions from '@/components/RecentTransactions'
import RightSidebar from '@/components/RightSidebar'
import HeaderBox from '@/components/ui/HeaderBox'
import TotalBalanceBox from '@/components/ui/TotalBalanceBox'
import { getAccount, getAccounts } from '@/lib/actions/bank.actions'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import React from 'react'

const Home =  async( {searchParams: {id, page }}: SearchParamProps) => {
//  we made it an async function so that we could use await
  const currentPage = Number(page as string) || 1;

  const loggedIn = await getLoggedInUser();
  // { firstName :'Jahan', lastName:'Shah', email:'contact@jahanshah.com'} 
const accounts = await getAccounts({
  userId: loggedIn.$id 
})
if (!accounts) return;

const accountsData = accounts?.data;
const appwriteItemId = (id as string) || accounts?.data[0]?.appwriteItemId ;

const account = await getAccount({ appwriteItemId });

// console.log({
//   accountsData,
//   account
// })


  return (
    <section className="home">
    <div className="home-content">
      <header className="home-header">
        <HeaderBox 
          type="greeting"
          title="Welcome"
          user={loggedIn.firstName || 'Guest'}
          subtext="Access and manage your account and trasactions effectively."
        />

        <TotalBalanceBox
          accounts={accountsData}
          totalBanks={accounts?.totalBanks}
          totalCurrentBalance={accounts?.totalCurrentBalance}
        />
      </header>

      <RecentTransactions
        accounts={accountsData}
        transactions={accounts?.transactions}t
        appwriteItemId={appwriteItemId}
        page={currentPage}
      />

      </div>

      

        <RightSidebar 
          user = {loggedIn}
          transactions={accounts?.transactions}
          banks={accountsData?.slice(0,2)}
        />

      </section>
  )
}

export default Home