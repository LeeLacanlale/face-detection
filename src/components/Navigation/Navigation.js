import React from 'react';

const Navigation = ({ routeChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav className='right'>
        <p onClick={() => routeChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
      </nav>
    );
  } else {
    return (
      <nav className='right'>
        <p onClick={() => routeChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
        <p onClick={() => routeChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
      </nav>
    );
  }
}

export default Navigation;