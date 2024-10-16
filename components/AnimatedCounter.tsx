'use client';

import CountUp from 'react-countup'

const AnimatedCounter = ({amount}:{amount: number}) => {
  return (
    <div>
        <CountUp
            end={amount}
            decimal="."
            decimals={2}
            prefix="CAD $ "
            duration={1.75}
        />
    </div>
  )
}

export default AnimatedCounter