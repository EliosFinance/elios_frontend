import './css/App.css'
import {Route, Routes} from "react-router-dom";
import AuthRoute from "./components/AuthRoute.tsx";
import Login from "@/pages/Login.tsx";
import Home from "@/pages/Home.tsx";
import PublicRoute from "@/components/PublicRoute.tsx";
import BankCheck from "@/components/BankCheck.tsx";
import {OsEnum, useDeviceDetection} from "@/hook/useDeviceDetection.ts";
// import LoginMobile from "@/pages/mobile/LoginMobile.tsx";

function App() {
    const {device: mobile, os} = useDeviceDetection()
    let googleId;
    
    switch (os) {
        case OsEnum.WEB:
            googleId = import.meta.env.VITE_GOOGLE_CLIENT_ID_WEB
            break;
        
        case OsEnum.ANDROID:
            googleId = import.meta.env.VITE_GOOGLE_CLIENT_ID_ANDROID
            break;
    
        case OsEnum.IOS:
            googleId = import.meta.env.VITE_GOOGLE_CLIENT_ID_IOS
            break;
            
        default:
            googleId = null;
            break;
    }


  return (
    <>
        <div className="min-w-[100dvw] min-h-[100dvh] flex">
            <Routes>
                <Route element={<AuthRoute />}>
                    <Route element={<BankCheck /> } >
                        <Route path="/" element={<Home />} />
                    </Route>
                </Route>
                <Route element={<PublicRoute />}>
                    { mobile === 'Desktop'
                        ? <Route path="/login" element={<Login VITE_GOOGLE_CLIENT_ID={googleId}/>}/>
                        : <Route path="/login" element={<Login VITE_GOOGLE_CLIENT_ID={googleId}/>}/>
                    }

                </Route>
            </Routes>
        </div>
    </>
  )
}

export default App
