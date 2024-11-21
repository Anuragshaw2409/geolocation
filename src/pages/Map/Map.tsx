import { useEffect, useState } from "react";
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import {  Marker, Polygon, useMap } from 'react-leaflet'
import { markedPresent } from "../../Store/User";
import { useSetRecoilState } from "recoil";
import 'leaflet/dist/leaflet.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Coords {
  latitude: number ;
  longitude: number ;
}
function Map() {
  const [location, setLocation] = useState<Coords>();
  const [error, setError] = useState<string | null>(null);
  const [fence, setFence] = useState<number[][]>([]);
  const setPresent = useSetRecoilState(markedPresent);
  const navigate = useNavigate();

  function fetchFence(){
    axios.get('http://43.204.107.200/:3000/api/v1/admin/fence')
    .then((res)=>{
      if(res.data.fence){
      setFence(res.data.fence.points)}
    })
    .catch((err)=>{
      console.log(err);
      
      alert("error getting fence");
    })
  }
  
  useEffect(()=>{
    fetchFence();
    getLocation();
    console.log(error);
    
    
  },[])

  function markAttendanceOnSite(){
    //api call to check if inside premise or not
    axios.post('http://43.204.107.200:3000/api/v1/user/isinside',{points:[location?.latitude,location?.longitude]})
    .then((res)=>{
      if(res.data.isInside){
        setPresent(true);
        alert("attendance marked");
        navigate('/');

      }
      else
        alert("Not inside premise");
    })

    //if inside:true//marker
    //else error

  }

  function markOffsiteattendance(){
    alert("Marked offsite attendance");
    setPresent(true);
    navigate('/');

  }

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
    <div className="w-full h-screen flex flex-col items-center bg-black text-white">
      <div className="font-semibold pt-6 mb-2 text-xl">
        Mark Attendance
      </div>
      <MapContainer
        center={[30.3785729, 77.82644379999999]} // Default center
        zoom={13}
        style={{ zIndex: 10 }}
        className='h-96 w-[90%] rounded-md border-2 border-green-500 z-10'
      >
        
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
          

        {location && <DynamicMarker location={location} />}
        {fence.length > 2 && (
                        <Polygon positions={fence.map((p) => [p[0], p[1]])} />

                  )}


      </MapContainer>

      <div className="w-full p-2 flex justify-around mt-10">
        <button className="w-36 p-2 rounded-xl bg-slate-500" onClick={markAttendanceOnSite}>On-site</button>
        <button className="w-36 p-2 rounded-xl bg-slate-500" onClick={markOffsiteattendance}>Off-site</button>

      </div>

    </div>
  )
}

export default Map


const DynamicMarker = ({ location }: { location: Coords }) => {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.setView([location.latitude, location.longitude], 13);
    }
  }, [location, map]);

  return <Marker position={[location.latitude, location.longitude]} />;
};