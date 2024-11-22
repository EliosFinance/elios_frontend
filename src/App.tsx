import './css/App.css'
import {Route, Routes, Navigate} from "react-router-dom";
import AuthRoute from "./components/AuthRoute.tsx";
import Login from "@/pages/Login.tsx";
import Home from "@/pages/Home.tsx";
import PublicRoute from "@/components/PublicRoute.tsx";
import BankCheck from "@/components/BankCheck.tsx";
import Auth from './pages/Auth/Auth.tsx';
import Register from './pages/Auth/Register/Register.tsx';
import Welcome from './pages/signup/Welcome.tsx';
import SignUpScreen from './pages/signup/Signup.tsx';
import EmailVerification from './pages/signup/EmailVerification.tsx';
import CreatePassword from './pages/signup/CreatePassword.tsx';
import ConfirmPassword from './pages/signup/ConfirmPassword.tsx';
import PINCodeScreen from './pages/signup/PINCodeScreen.tsx';
import ConfirmPIN from './pages/signup/ConfirmPin.tsx';
import TermsAndConditions from './pages/signup/TermsAndConditions.tsx';
import Pin from './pages/Auth/Pin.tsx';

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
                    {/* <Route path="/" element={<Auth />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/register" element={<Register />}/> */}

                     {/* Route pour l'écran de bienvenue */}
          <Route path="/" element={<Welcome />} />

{/* Route pour la création de compte */}
<Route path="/signup" element={<SignUpScreen />} />

{/* Route pour la vérification de l'email */}
<Route path="/verify-email" element={<EmailVerification />} />

{/* Route pour la création du mot de passe */}
<Route path="/create-password" element={<CreatePassword />} />

{/* Route pour la confirmation du mot de passe */}
<Route path="/confirm-password" element={<ConfirmPassword />} />

{/* Route pour la création du code PIN */}
<Route path="/create-pin" element={<PINCodeScreen />} />

{/* Route pour la confirmation du code PIN */}
<Route path="/confirm-pin" element={<ConfirmPIN />} />

{/* Route pour accepter les conditions générales */}
<Route path="/terms" element={<TermsAndConditions />} />
<Route path="/pin" element={<Pin />} />

{/* Redirection par défaut vers la page d'accueil */}
<Route path="*" element={<Navigate to="/" />} />

                </Route>
            </Routes>
        </div>
    </>
  )
}

export default App
