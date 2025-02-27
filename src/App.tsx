import './css/App.css';
import Layout from '@/components/Layout.tsx';
import PublicRoute from '@/components/PublicRoute.tsx';
import { OsEnum, useDeviceDetection } from '@/hook/useDeviceDetection.ts';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Pin } from 'lucide-react';
import { Route, Routes } from 'react-router-dom';
import AuthRoute from './components/AuthRoute.tsx';
import PartnerChallenge from './components/PartnerChallenge.tsx';
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
import ConnectBankAccount from './pages/Bank/ConnectBankAccount.tsx';
import DisplaySingleConnector from './pages/Bank/DisplaySingleConnector.tsx';
import Friends from './pages/Friends.tsx';
import Home from './pages/Home.tsx';
import Landing from './pages/Landing.tsx';
import AllArticleCategories from './pages/Learn/AllArticleCategories.tsx';
import Article from './pages/Learn/Article.tsx';
import ArticleCategory from './pages/Learn/ArticleCategory.tsx';
import LearnHomePage from './pages/Learn/LearnHomePage.tsx';
import Partners from './pages/Partners.tsx';
import Rewards from './pages/Rewards.tsx';
import ChangeLog from './pages/Settings/About/ChangeLog.tsx';
import LegalMentions from './pages/Settings/About/LegalMentions.tsx';
import OurHistory from './pages/Settings/About/OurHistory.tsx';
import OurPartners from './pages/Settings/About/OurPartners.tsx';
import OurTeam from './pages/Settings/About/OurTeam.tsx';
import PrivacyPolicy from './pages/Settings/About/PrivacyPolicy.tsx';
import TermsOfUse from './pages/Settings/About/TermsOfUse.tsx';
import ContactUs from './pages/Settings/Help/ContactUs.tsx';
import FAQ from './pages/Settings/Help/FAQ.tsx';
import MyBankAccounts from './pages/Settings/MyElios/MyBankAccounts.tsx';
import MyNotifications from './pages/Settings/MyElios/MyNotifications.tsx';
import MyProfile from './pages/Settings/MyElios/MyProfile.tsx';
import MyReferrals from './pages/Settings/MyElios/MyReferrals.tsx';
import MyRewards from './pages/Settings/MyElios/MyRewards.tsx';
import MySubscription from './pages/Settings/MyElios/MySubscription.tsx';
import MyAccessCodes from './pages/Settings/Security/MyAccessCodes.tsx';
import MyDeviceManagement from './pages/Settings/Security/MyDeviceManagement.tsx';
import TwoFactorAuthentication from './pages/Settings/Security/TwoFactorAuthentication.tsx';
import SettingsHome from './pages/Settings/SettingsHome.tsx';
import FollowOurSocialNetworks from './pages/Settings/Social/FollowOurSocialNetworks.tsx';
import SingleDefi from './pages/SingleDefi.tsx';
import SingleFriend from './pages/SingleFriends.tsx';
import Subscription from './pages/Subscription/Subscription.tsx';
import APP_ROUTES_ENUM from './types/APP_ROUTES_ENUM.ts';
import { challengeData } from './types/challengeType.ts';
import PolitiqueConfidentialite from './pages/Settings/Confidentialite/PolitiqueConfidentialite.tsx';

function App() {
    const { os } = useDeviceDetection();
    let googleId;

    switch (os) {
        case OsEnum.WEB:
        case OsEnum.WEB.toLowerCase():
            googleId = import.meta.env.VITE_GOOGLE_CLIENT_ID_WEB;
            break;

        case OsEnum.ANDROID:
        case OsEnum.ANDROID.toLowerCase():
            googleId = import.meta.env.VITE_GOOGLE_CLIENT_ID_ANDROID;
            break;

        case OsEnum.IOS:
        case OsEnum.IOS.toLowerCase():
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
                        <Route element={<Layout />}>
                            <Route path={APP_ROUTES_ENUM.HOME} element={<Landing />} />
                            <Route path={APP_ROUTES_ENUM.PARTNERS} element={<Partners />} />

                            {/* Learn */}
                            <Route path={APP_ROUTES_ENUM.LEARN} element={<LearnHomePage />} />
                            <Route path={`${APP_ROUTES_ENUM.ARTICLE}/:id`} element={<Article />} />
                            <Route path={`${APP_ROUTES_ENUM.ARTICLE_CATEGORIES}`} element={<AllArticleCategories />} />
                            <Route path={`${APP_ROUTES_ENUM.ARTICLE_CATEGORY}/:id`} element={<ArticleCategory />} />
                            {/* End Learn */}

                            <Route path={APP_ROUTES_ENUM.ACCOUNT} element={<Account />} />
                            <Route path={APP_ROUTES_ENUM.REWARDS} element={<Rewards />} />
                            <Route path={`${APP_ROUTES_ENUM.CHALLENGE}/:id`} element={<SingleDefi />} />
                            <Route path={APP_ROUTES_ENUM.FRIENDS} element={<Friends />} />
                            <Route path={`${APP_ROUTES_ENUM.FRIENDS}/:id`} element={<SingleFriend />} />
                            <Route path={APP_ROUTES_ENUM.CONNECT_BANK_ACCOUNT} element={<ConnectBankAccount />} />
                            <Route
                                path={`${APP_ROUTES_ENUM.DISPLAY_SINGLE_CONNECTOR}/:uuid`}
                                element={<DisplaySingleConnector />}
                            />

                            {/* Settings */}
                            <Route path={APP_ROUTES_ENUM.SETTINGS} element={<SettingsHome />} />
                            <Route path={APP_ROUTES_ENUM.SETTINGS_PROFILE} element={<MyProfile />} />
                            <Route path={APP_ROUTES_ENUM.SETTINGS_BANK_ACCOUNTS} element={<MyBankAccounts />} />
                            <Route path={APP_ROUTES_ENUM.SETTINGS_SUBSCRIPTIONS} element={<MySubscription />} />
                            <Route path={APP_ROUTES_ENUM.SETTINGS_REWARDS} element={<MyRewards />} />
                            <Route path={APP_ROUTES_ENUM.SETTINGS_REFERRALS} element={<MyReferrals />} />
                            <Route path={APP_ROUTES_ENUM.SETTINGS_NOTIFICATIONS} element={<MyNotifications />} />
                            <Route path={APP_ROUTES_ENUM.SETTINGS_ACCESS_CODES} element={<MyAccessCodes />} />
                            <Route path={APP_ROUTES_ENUM.SETTINGS_2FA} element={<TwoFactorAuthentication />} />
                            <Route path={APP_ROUTES_ENUM.SETTINGS_POLITIQUE_CONFIDENTIALITE} element={<PolitiqueConfidentialite />} />
                            <Route
                                path={APP_ROUTES_ENUM.SETTINGS_DEVICES_MANAGEMENT}
                                element={<MyDeviceManagement />}
                            />
                            <Route
                                path={APP_ROUTES_ENUM.SETTINGS_FOLLOW_OUR_SOCIAL_NETWORKS}
                                element={<FollowOurSocialNetworks />}
                            />
                            <Route path={APP_ROUTES_ENUM.SETTINGS_FAQ} element={<FAQ />} />
                            <Route path={APP_ROUTES_ENUM.SETTINGS_CONTACT_US} element={<ContactUs />} />
                            <Route path={APP_ROUTES_ENUM.SETTINGS_OUR_HISTORY} element={<OurHistory />} />
                            <Route path={APP_ROUTES_ENUM.SETTINGS_OUR_TEAM} element={<OurTeam />} />
                            <Route path={APP_ROUTES_ENUM.SETTINGS_OUR_PARTNERS} element={<OurPartners />} />
                            <Route path={APP_ROUTES_ENUM.SETTINGS_LEGAL_MENTIONS} element={<LegalMentions />} />
                            <Route path={APP_ROUTES_ENUM.SETTINGS_PRIVACY_POLICY} element={<PrivacyPolicy />} />
                            <Route path={APP_ROUTES_ENUM.SETTINGS_CHANGE_LOG} element={<ChangeLog />} />
                            <Route path={APP_ROUTES_ENUM.SETTINGS_TERMS_OF_USE} element={<TermsOfUse />} />
                            {/* End Settings */}
                        </Route>
                    </Route>

                    <Route element={<PublicRoute />}>
                        <Route
                            path={`${APP_ROUTES_ENUM.TEST}`}
                            element={<PartnerChallenge challenge={challengeData} />}
                        />
                        <Route
                            path={APP_ROUTES_ENUM.SUBSCRIPTION}
                            element={
                                <Subscription
                                    onBack={() => {
                                        /s/;
                                    }}
                                />
                            }
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
                        <Route path={APP_ROUTES_ENUM.LOGIN} element={<Authenticate />} />
                    </Route>
                </Routes>
            </div>
        </GoogleOAuthProvider>
    );
}

export default App;
