import React, { useEffect, useCallback, useState } from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';

const App = () => {
  const [airquality, setAirquality] = useState(false);
  const [city, setCity] = useState('Mississauga');
  const fetchPollen = useCallback(async () => {
    const http = require('https');
    const options = {
      method: 'GET',
      hostname: 'api.ambeedata.com',
      port: null,
      path: `/latest/pollen/by-place?place=${city},Ontario`,
      headers: {
        'x-api-key': 'Oo0url3S869GucDIKRwDt7q7VqIV0DTW7lrjPw47',
        'Content-type': 'application/json',
      },
    };
    const req = http.request(options, function (res) {
      const chunks = [];
      res.on('data', function (chunk) {
        chunks.push(chunk);
      });
      res.on('end', function () {
        const body = Buffer.concat(chunks);
        console.log(JSON.parse(body.toString()).data[0]);
        setAirquality(JSON.parse(body.toString()).data[0]);
      });
    });
    req.end();
  }, [city]);

  useEffect(() => {
    fetchPollen();
  }, [fetchPollen, city]);

  const handleCity = value => {
    setCity(value);
  };

  const cityDD = () => {
    const cities = [
      'Mississauga',
      'Nobleton',
      'Brampton',
      'Toronto',
      'Oakville',
      'Niagara Falls Canada',
    ];
    const cityOptions = cities.map(city => {
      return <option value={city}>{city}</option>;
    });
    return (
      <select
        className="p-2 border border-gray-400"
        onChange={e => handleCity(e.target.value)}
      >
        {cityOptions}
      </select>
    );
  };

  const riskFactor = (response = 'Low') => {
    let colour;
    switch (response) {
      case 'Low':
        colour = 'bg-blue-700 border-blue-500';
        break;
      case 'Moderate':
        colour = 'bg-green-700 border-green-500';
        break;
      case 'High':
        colour = 'bg-yellow-700 border-yellow-500';
        break;
      default:
        colour = 'bg-red-700 border-red-500';
        break;
    }
    return colour;
  };

  const pollenList = [
    { name: 'Grass', risk: 'grass_pollen', img: 'grass.png' },
    { name: 'Tree', risk: 'tree_pollen', img: 'tree.png' },
    { name: 'Weed', risk: 'weed_pollen', img: 'weed.png' },
  ];

  return (
    <div className="App">
      <Header city={city} />
      <main className="max-w-screen-md p-3 mx-auto">
        <p>{cityDD()}</p>
        {airquality ? (
          <>
            <div className="grid grid-cols-3 gap-3 text-xs sm:text-base mb-5">
              {pollenList.map((e, i) => (
                <div key={`pollen-${i}`}>
                  <h2 className="text-base sm:text-lg">{e.name} Pollen</h2>
                  <div
                    className={`shadow-lg rounded-full p-3 sm:w-52 sm:h-52 flex flex-col justify-center items-center mx-auto border-4 ${riskFactor(
                      airquality.Risk[e.risk],
                    )}`}
                  >
                    <img
                      className="w-10 block"
                      src={require(`./img/${e.img}`).default}
                      alt={e.name}
                    />
                    <span className="text-white">
                      <strong>{airquality.Risk[e.risk]}</strong>
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs sm:text-base border-2 border-gray-400 rounded-xl p-3 shadow-lg">
              {Object.keys(airquality.Species).map((species, index) => {
                return (
                  <div>
                    <h2 className="text-base sm:text-lg mb-1">{species}</h2>
                    {Object.keys(airquality.Species[species]).map(
                      (key, index) => (
                        <div>
                          {key}: {airquality.Species[species][key]}
                        </div>
                      ),
                    )}
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <p className="font-bold animate-pulse text-base sm:text-lg">
            Retrieving Report...
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
