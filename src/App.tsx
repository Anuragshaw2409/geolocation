import  { useState } from 'react';

interface Coords{
  latitude:number|null;
  longitude:number|null;
}

const App = () => {
  const [location, setLocation] = useState<Coords>({latitude:null,longitude:null});
  const [error, setError] = useState<string|null>(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setError(null);
      },
      (err) => {
        setError(err.message);
      }
    );
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Geolocation Example</h1>
      <button onClick={getLocation} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Get GPS Location
      </button>
      {location.latitude && location.longitude && (
        <div>
          <h3>Your Location:</h3>
          <p>Latitude: {location!.latitude}</p>
          <p>Longitude: {location!.longitude}</p>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default App;
