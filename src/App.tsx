import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Button} from "@/components/ui/button.tsx";
import {Route, Routes} from "react-router-dom";
import AuthRoute from "./components/AuthRoute.tsx";
import Login from "@/pages/Login.tsx";
import Home from "@/pages/Home.tsx";
import PublicRoute from "@/components/PublicRoute.tsx";
import BankCheck from "@/components/BankCheck.tsx";

function App() {

  return (
    <>
        <div className="w-dvw min-h-[100dvh] p-8 flex flex-col items-center justify-center">
            <Routes>
                <Route element={<AuthRoute />}>
                    <Route element={<BankCheck /> } >
                        <Route path="/" element={<Home />} />
                    </Route>
                </Route>
                <Route element={<PublicRoute />}>
                    <Route path="/login" element={<Login />}/>
                </Route>
            </Routes>
        </div>
    </>
  )
}

export default App
