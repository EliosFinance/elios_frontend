const APP_ROUTES_ENUM = {
    // Authenticated routes
    HOME: '/home',
    ACCOUNT: '/account',
    BALANCE: '/balance',
    CHALLENGE: '/challenge',
    FRIENDS: '/friends',
    SINGLE_FRIEND: '/friends/:id',
    REWARDS: '/rewards',
    PARTNERS: '/partners',
    CONNECT_BANK_ACCOUNT: '/connect-bank-account',
    DISPLAY_SINGLE_CONNECTOR: '/display-single-connector',
    SUBSCRIPTION: '/subscription',

    // Login routes
    LOGIN: '/login',
    TEST: '/test',
    REGISTER: '/register',
    VERIFY_EMAIL: '/register/verify-email',
    CREATE_USERNAME: '/register/create_username',
    CREATE_PASSWORD: '/register/create-password',
    CONFIRM_PASSWORD: '/register/confirm-password',
    CREATE_PIN: '/register/create-pin',
    CONFIRM_PIN: '/register/confirm-pin',
    TERMS: '/register/terms',
    PIN: '/register/pin',

    // Learn routes
    LEARN: '/learn',
    ARTICLE: '/learn/article',
    ARTICLE_CATEGORIES: '/learn/article-categories',
    ARTICLE_CATEGORY: '/learn/article-category',

    // Settings routes
    SETTINGS: '/settings',
    SETTINGS_PROFILE: '/settings/profile',
    SETTINGS_BANK_ACCOUNTS: '/settings/bank-accounts',
    SETTINGS_SUBSCRIPTIONS: '/settings/subscriptions',
    SETTINGS_REWARDS: '/settings/rewards',
    SETTINGS_REFERRALS: '/settings/referrals',
    SETTINGS_NOTIFICATIONS: '/settings/notifications',
    SETTINGS_ACCESS_CODES: '/settings/access-codes',
    SETTINGS_2FA: '/settings/2fa',
    SETTINGS_DEVICES_MANAGEMENT: '/settings/devices-management',
    SETTINGS_SHARE_MY_ACTIVITY: '/settings/share-my-activity',
    SETTINGS_FOLLOW_OUR_SOCIAL_NETWORKS: '/settings/follow-our-social-networks',
    SETTINGS_FAQ: '/settings/faq',
    SETTINGS_CONTACT_US: '/settings/contact-us',
    SETTINGS_OUR_HISTORY: '/settings/our-history',
    SETTINGS_OUR_TEAM: '/settings/our-team',
    SETTINGS_OUR_PARTNERS: '/settings/our-partners',
    SETTINGS_LEGAL_MENTIONS: '/settings/legal-mentions',
    SETTINGS_PRIVACY_POLICY: '/settings/privacy-policy',
    SETTINGS_CHANGE_LOG: '/settings/change-log',
    SETTINGS_TERMS_OF_USE: '/settings/terms-of-use',
};

export default APP_ROUTES_ENUM;
