import './css/App.css';
import BankCheck from '@/components/BankCheck.tsx';
import PublicRoute from '@/components/PublicRoute.tsx';
import { OsEnum, useDeviceDetection } from '@/hook/useDeviceDetection.ts';
import Home from '@/pages/Home.tsx';
import Login from '@/pages/Login.tsx';
import { Pin } from 'lucide-react';
import { Route, Routes } from 'react-router-dom';
import AuthRoute from './components/AuthRoute.tsx';
import PartnerChallenge from './components/PartnerChallenge.tsx';
import { APP_ROUTES_ENUM } from './main.tsx';
import Account from './pages/Account.tsx';
import AllArticleCategories from './pages/Blog/AllArticleCategories.tsx';
import Article from './pages/Blog/Article.tsx';
import ArticleCategory from './pages/Blog/ArticleCategory.tsx';
import Learn from './pages/Blog/Learn.tsx';
import Friends from './pages/Friends.tsx';
import Landing from './pages/Landing.tsx';
import Partners from './pages/Partners.tsx';
import Rewards from './pages/Rewards.tsx';
import SingleDefi from './pages/SingleDefi.tsx';
import SingleFriend from './pages/SingleFriends.tsx';
import ConfirmPassword from './pages/signup/ConfirmPassword.tsx';
import ConfirmPIN from './pages/signup/ConfirmPin.tsx';
import CreatePassword from './pages/signup/CreatePassword.tsx';
import EmailVerification from './pages/signup/EmailVerification.tsx';
import PINCodeScreen from './pages/signup/PINCodeScreen.tsx';
import SignUpScreen from './pages/signup/Signup.tsx';
import TermsAndConditions from './pages/signup/TermsAndConditions.tsx';
import Welcome from './pages/signup/Welcome.tsx';
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
        <>
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
                            <Route path={`${APP_ROUTES_ENUM.DEFI}/:id`} element={<SingleDefi />} />
                            <Route path={APP_ROUTES_ENUM.FRIENDS} element={<Friends />} />
                            <Route path={`${APP_ROUTES_ENUM.FRIENDS}/:id`} element={<SingleFriend />} />
                        </Route>
                    </Route>

                    <Route element={<PublicRoute />}>
                        <Route
                            path={`${APP_ROUTES_ENUM.TEST}`}
                            element={<PartnerChallenge challenge={challengeData} />}
                        />
                        {/* Login */}
                        <Route path='/signup' element={<SignUpScreen />} />
                        <Route path='/verify-email' element={<EmailVerification />} />
                        <Route path='/create-password' element={<CreatePassword />} />
                        <Route path='/confirm-password' element={<ConfirmPassword />} />
                        <Route path='/create-pin' element={<PINCodeScreen />} />
                        <Route path='/confirm-pin' element={<ConfirmPIN />} />
                        <Route path='/terms' element={<TermsAndConditions />} />
                        <Route path='/pin' element={<Pin />} />
                        {/* End Login */}

                        <Route path={'*'} element={<Welcome />} />
                        <Route path={APP_ROUTES_ENUM.LOGIN} element={<Login VITE_GOOGLE_CLIENT_ID={googleId} />} />
                    </Route>
                </Routes>
            </div>
        </>
    );
}

export default App;
