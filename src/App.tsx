import './css/App.css'
import {Route, Routes} from "react-router-dom";
import AuthRoute from "./components/AuthRoute.tsx";
import Login from "@/pages/Login.tsx";
import Home from "@/pages/Home.tsx";
import PublicRoute from "@/components/PublicRoute.tsx";
import BankCheck from "@/components/BankCheck.tsx";
import {useDeviceDetection} from "@/hook/useDeviceDetection.ts";
// import LoginMobile from "@/pages/mobile/LoginMobile.tsx";

function App() {
    const {device: mobile} = useDeviceDetection()

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
                        ? <Route path="/login" element={<Login />}/>
                        : <Route path="/login" element={<Login />}/>
                    }

                </Route>
            </Routes>
        </div>
    </>
  )
}

export default App
