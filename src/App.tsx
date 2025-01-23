import './css/App.css';
import BankCheck from '@/components/BankCheck.tsx';
import PublicRoute from '@/components/PublicRoute.tsx';
import { OsEnum, useDeviceDetection } from '@/hook/useDeviceDetection.ts';
import Home from '@/pages/Home.tsx';
import Login from '@/pages/Login.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Pin } from 'lucide-react';
import { Route, Routes } from 'react-router-dom';
import AuthRoute from './components/AuthRoute.tsx';
import PartnerChallenge from './components/PartnerChallenge.tsx';
import { APP_ROUTES_ENUM } from './main.tsx';
import Account from './pages/Account.tsx';
import Authenticate from './pages/Auth/Authenticate.tsx';
import FirstTimerView from './pages/Auth/FirstTimerView.tsx';
import EmailVerification from './pages/Auth/Register/views/1_EmailVerification.tsx';
import CreateUsername from './pages/Auth/Register/views/2_Username.tsx';
import CreatePassword from './pages/Auth/Register/views/3_CreatePassword.tsx';
import ConfirmPassword from './pages/Auth/Register/views/4_ConfirmPassword.tsx';
import PINCodeScreen from './pages/Auth/Register/views/5_CreatePINCodeScreen.tsx';
import ConfirmPIN from './pages/Auth/Register/views/6_ConfirmPin.tsx';
import TermsAndConditions from './pages/Auth/Register/views/7_TermsAndConditions.tsx';
import AllArticleCategories from './pages/Blog/AllArticleCategories.tsx';
import Article from './pages/Blog/Article.tsx';
import ArticleCategory from './pages/Blog/ArticleCategory.tsx';
import Learn from './pages/Blog/Learn.tsx';
import Friends from './pages/Friends.tsx';
import Landing from './pages/Landing.tsx';
import Partners from './pages/Partners.tsx';
import Rewards from './pages/Rewards.tsx';
import SettingsHome from './pages/Settings/SettingsHome.tsx';
import SingleDefi from './pages/SingleDefi.tsx';
import SingleFriend from './pages/SingleFriends.tsx';
import { challengeData } from './types/challengeType.ts';

function App() {
    const { os } = useDeviceDetection();
    let googleId;

    switch (os) {
        case OsEnum.WEB:
            googleId = import.meta.env.VITE_GOOGLE_CLIENT_ID_WEB;
            break;

        case OsEnum.ANDROID:
            googleId = import.meta.env.VITE_GOOGLE_CLIENT_ID_ANDROID;
            break;

        case OsEnum.IOS:
            googleId = import.meta.env.VITE_GOOGLE_CLIENT_ID_IOS;
            break;

        default:
            googleId = null;
            break;
    }

    return (
        <GoogleOAuthProvider clientId={googleId}>
            <div className='min-w-[100dvw] min-h-[100dvh] max-h-[100dvh] flex'>
                <Routes>
                    <Route element={<AuthRoute />}>
                        <Route element={<BankCheck />}>
                            <Route path={APP_ROUTES_ENUM.HOME} element={<Landing />} />
                            <Route path={APP_ROUTES_ENUM.PARTNERS} element={<Partners />} />
                            <Route path={APP_ROUTES_ENUM.LANDING} element={<Home />} />

                            {/* Learn */}
                            <Route path={APP_ROUTES_ENUM.LEARN} element={<Learn />} />
                            <Route path={`${APP_ROUTES_ENUM.ARTICLE}/:id`} element={<Article />} />
                            <Route path={`${APP_ROUTES_ENUM.ARTICLE_CATEGORIES}`} element={<AllArticleCategories />} />
                            <Route path={`${APP_ROUTES_ENUM.ARTICLE_CATEGORY}/:id`} element={<ArticleCategory />} />
                            {/* End Learn */}

                            <Route path={APP_ROUTES_ENUM.ACCOUNT} element={<Account />} />
                            <Route path={APP_ROUTES_ENUM.REWARDS} element={<Rewards />} />
                            <Route path={`${APP_ROUTES_ENUM.CHALLENGE}/:id`} element={<SingleDefi />} />
                            <Route path={APP_ROUTES_ENUM.FRIENDS} element={<Friends />} />
                            <Route path={`${APP_ROUTES_ENUM.FRIENDS}/:id`} element={<SingleFriend />} />

                            {/* Settings */}
                            <Route path={APP_ROUTES_ENUM.SETTINGS} element={<SettingsHome />} />
                            {/* End Settings */}
                        </Route>
                    </Route>

                    <Route element={<PublicRoute />}>
                        <Route
                            path={`${APP_ROUTES_ENUM.TEST}`}
                            element={<PartnerChallenge challenge={challengeData} />}
                        />
                        {/* Login */}
                        <Route path={APP_ROUTES_ENUM.REGISTER} element={<Authenticate />} />
                        <Route path={APP_ROUTES_ENUM.VERIFY_EMAIL} element={<EmailVerification />} />
                        <Route path={APP_ROUTES_ENUM.CREATE_USERNAME} element={<CreateUsername />} />
                        <Route path={APP_ROUTES_ENUM.CREATE_PASSWORD} element={<CreatePassword />} />
                        <Route path={APP_ROUTES_ENUM.CONFIRM_PASSWORD} element={<ConfirmPassword />} />
                        <Route path={APP_ROUTES_ENUM.CREATE_PIN} element={<PINCodeScreen />} />
                        <Route path={APP_ROUTES_ENUM.CONFIRM_PIN} element={<ConfirmPIN />} />
                        <Route path={APP_ROUTES_ENUM.TERMS} element={<TermsAndConditions />} />
                        <Route path={APP_ROUTES_ENUM.PIN} element={<Pin />} />
                        {/* End Login */}

                        <Route path={'*'} element={<FirstTimerView />} />
                        {/* <Route path={APP_ROUTES_ENUM.LOGIN} element={<Login VITE_GOOGLE_CLIENT_ID={googleId} />} /> */}
                        <Route path={APP_ROUTES_ENUM.LOGIN} element={<Authenticate />} />
                    </Route>
                </Routes>
            </div>
        </GoogleOAuthProvider>
    );
}

export default App;
