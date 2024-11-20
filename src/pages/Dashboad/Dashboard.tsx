import { FcCalendar,FcBullish ,FcAdvertising} from "react-icons/fc";
import { useRecoilState } from "recoil";
import { markedPresent } from "../../Store/User";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [present,setPresent] = useRecoilState(markedPresent);
  const navigate = useNavigate();
  return (
    <div className="h-screen bg-black w-full flex flex-col gap-y-6 text-white items-center pt-4">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="w-[80%] flex flex-col text-sm items-center border-[0.5px] border-zinc-400 p-4 rounded-md h-40">

        <div className="h-20 w-20 rounded-full overflow-hidden ">
          <img 
          className="h-full"
          src="https://img.freepik.com/premium-photo/anime-male-avatar_950633-956.jpg" alt="" />
        </div>
        <p>Anurag Shaw</p>
        <p>(In-Office Employee)</p>

      </div>

      <div className="w-[80%] border-[0.5px] border-zinc-400 p-4 rounded-md flex justify-between items-center">
        <p>Sign in for work:</p>
        <input type="checkbox" 
        onClick={()=>{
          if(!present){
          navigate('/map')}
          else
          setPresent(false);

        }}
        checked={present}
        className="scale-125"/>
      </div>


      <div className="w-[80%] border-[0.5px] border-zinc-400 p-4 rounded-md flex justify-between items-center">
        <p>Mark for leave</p>
        <FcCalendar className="text-2xl"/>
      </div>

      <div className="w-[80%] border-[0.5px] border-zinc-400 p-4 rounded-md flex justify-between items-center">
        <p>Track your progress</p>
        <FcBullish className="text-2xl"/>
      </div>

      <div className="w-[80%] border-[0.5px] border-zinc-400 p-4 rounded-md flex justify-between items-center">
        <p>Alerts:</p>
        <FcAdvertising className="text-2xl"/>
      </div>

      <button className="w-[60%] bg-zinc-400 p-2 rounded-xl text-black font-semibold">Logout</button>


    
    </div>
  )
}

export default Dashboard
