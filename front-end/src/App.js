
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/homePage"
import { ChartPage } from "./pages/chartPage"
import { NavbarComp} from "../src/components/navbar"
import { useDispatch } from "react-redux"
import Axios from "axios";
import { login } from "./redux/userSlice"
import { useEffect } from "react";
// import { ProfilPage } from "./pages/ProfilPage";
// import { UserPage } from "./pages/UserPage";
// import { ChatPage } from "./pages/ChatPage";
// import { DetailChat } from "./pages/DetailChat";
import { ResetPassPage } from "./pages/resetPassPage"
import { VerificationPage } from "./pages/verificationPage"
import './App.css';


function App() {

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const keepLogin = async () => {
    try {
      const res = await Axios.get(`http://localhost:2000/user/keepLogin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res.data);
      dispatch(login({
        id: res.data.id,
        username: res.data.username,
        email: res.data.email,
        profilePic: res.data.profilePic,
        isVerified: res.data.isVerified,
      }));
    } catch (err) {
      console.log(err);
    }
  };

useEffect(() => {
  keepLogin()
})

  return (
    <div>
      
      <Routes>
        <Route path="/" element={<><NavbarComp /><HomePage/></>} />
        <Route path="/chart" element={<><NavbarComp /><ChartPage /></>} />
        <Route path="/resetpassword/:token" element={<ResetPassPage />} />
        <Route path="/verification/:token" element={<VerificationPage />} />
      </Routes>
    </div>
  );
}

export default App;