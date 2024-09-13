import './css/App.css'
import {Route, Routes} from "react-router-dom";
import AuthRoute from "./components/AuthRoute.tsx";
import Login from "@/pages/Login.tsx";
import Home from "@/pages/Home.tsx";
import PublicRoute from "@/components/PublicRoute.tsx";
import BankCheck from "@/components/BankCheck.tsx";
import Auth from './pages/Auth/Auth.tsx';
import Register from './pages/Auth/Register/Register.tsx';

function App() {

  return (
    <>
        <div className="min-w-[100dvw] min-h-[100dvh] flex">
            <Routes>
                <Route element={<AuthRoute />}>
                    <Route element={<BankCheck /> } >
                        <Route path="/home" element={<Home />} />
                    </Route>
                </Route>
                <Route element={<PublicRoute />}>
                    <Route path="/" element={<Auth />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/register" element={<Register />}/>
                </Route>
            </Routes>
        </div>
    </>
  )
}

export default App
