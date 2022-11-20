import React, { useState } from 'react'
import Authentication from './components/Authentication'
import Main from './components/Main';

const App = () => {

  const [isOnHome,setOnHome] = useState(true)
  const [id,setId] = useState(1)


  return (
    <div className='scroll-smootha'>
      {isOnHome ? (
        id >= 0 ? (
          <Main id={id} setOnHome={setOnHome} />
        ) : (
          <></>
        )
      ) : (
        <Authentication setOnHome={setOnHome} setId={setId} />
      )}
    </div>
  );
}

export default App