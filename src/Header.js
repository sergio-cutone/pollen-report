import React from 'react';

const Header = ({ city, isLoaded }) => {
  return (
    <header className="App-header text-center font-bold text-base sm:text-2xl bg-gradient-to-r from-blue-500 via-yellow-500 to-red-500 text-white p-5">
      <h1>
        {isLoaded && `${city} Pollen Report`} {!isLoaded && 'Loading...'}
      </h1>
    </header>
  );
};

export default Header;
