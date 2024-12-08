import './css/App.css';
import BankCheck from '@/components/BankCheck.tsx';
import PublicRoute from '@/components/PublicRoute.tsx';
import { OsEnum, useDeviceDetection } from '@/hook/useDeviceDetection.ts';
import Home from '@/pages/Home.tsx';
import Login from '@/pages/Login.tsx';
import { Route, Routes } from 'react-router-dom';
import AuthRoute from './components/AuthRoute.tsx';
import PartnerChallenge from './components/PartnerChallenge.tsx';
import { APP_ROUTES_ENUM } from './main.tsx';
import AllArticleCategories from './pages/Blog/AllArticleCategories.tsx';
import Article from './pages/Blog/Article.tsx';
import ArticleCategory from './pages/Blog/ArticleCategory.tsx';
import Learn from './pages/Blog/Learn.tsx';
import Subscription from './pages/subscription/Subscription.tsx';
import Friends from './pages/Friends.tsx';
import Partners from './pages/Partners.tsx';
import SingleDefi from './pages/SingleDefi.tsx';
import SingleFriend from './pages/SingleFriends.tsx';
import { challengeData } from './types/challengeType.ts';
import Account from './pages/Account.tsx';
import Rewards from './pages/Rewards.tsx';

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
                            <Route path={APP_ROUTES_ENUM.PARTNERS} element={<Partners />} />
                            <Route path={APP_ROUTES_ENUM.LEARN} element={<Learn />} />
                            <Route path={APP_ROUTES_ENUM.HOME} element={<Home />} />
                            <Route path={`${APP_ROUTES_ENUM.ARTICLE}/:id`} element={<Article />} />
                            <Route path={`${APP_ROUTES_ENUM.ARTICLE_CATEGORIES}`} element={<AllArticleCategories />} />
                            <Route path={`${APP_ROUTES_ENUM.ARTICLE_CATEGORY}/:id`} element={<ArticleCategory />} />
                        </Route>
                    </Route>
                    <Route element={<PublicRoute />}>
                        <Route path={`${APP_ROUTES_ENUM.TEST}`} element={<PartnerChallenge challenge={challengeData} />} />
                        <Route path={APP_ROUTES_ENUM.ACCOUNT} element={<Account />} />
                        <Route path={APP_ROUTES_ENUM.REWARDS} element={<Rewards />} />
                        <Route path={`${APP_ROUTES_ENUM.DEFI}/:id`} element={<SingleDefi />} />
                        <Route path={APP_ROUTES_ENUM.Friends} element={<Friends />} />
                        <Route path={`${APP_ROUTES_ENUM.Friends}/:id`} element={<SingleFriend />} />
                        <Route path={APP_ROUTES_ENUM.LOGIN} element={<Login VITE_GOOGLE_CLIENT_ID={googleId} />} />
                        <Route path={APP_ROUTES_ENUM.SUBSCRIPTION} element={<Subscription onBack={() => {}} onToggleVisibility={() => {}} />} />
                    </Route>
                </Routes>
            </div>
        </>
    );
}

export default App;
