import React from 'react';
import reactLogo from './img/react.png';
import ambeeLogo from './img/ambee.png';
import tailwindcssLogo from './img/tailwindcss.png';

const Footer = () => {
  const date = new Date();
  return (
    <footer className="mx-auto p-5">
      <p>Copyright {date.getFullYear()} Sergio Cutone</p>
      <p>
        <img
          src={reactLogo}
          alt="React"
          title="React"
          className="inline h-14"
        />{' '}
        <img
          src={ambeeLogo}
          alt="Ambee"
          title="Ambee"
          className="inline h-14"
        />{' '}
        <img
          src={tailwindcssLogo}
          alt="TailwindCSS"
          title="TailwindCSS"
          className="inline h-14"
        />
      </p>
    </footer>
  );
};

export default Footer;
