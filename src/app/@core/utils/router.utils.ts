export const ROUTER_UTILS = {
  config: {
    base: {
      home: '',
      dashboard: 'dashboard',
      intro: 'intro'
    },
    structure: {
      tabs: 'tabs',
      tab1: 'tab1',
      tab2: 'tab2',
      tab3: 'tab3',
      sideNav: 'sidenav'
    },
    auth: {
      root: 'auth',
      login: 'login',
      signUp: 'sign-up',
      forgotPassword: 'forgot-password',
      forgotPasswordEmailSent: 'forgot-password-email-sent',
      passwordReset: 'password-reset',
      passwordResetFailed: 'password-reset-failed',
      passwordResetSucceeded: 'password-reset-succeeded',
    },
    settings: {
      root: 'settings',
      account: 'account',
      appearance: 'appearance',
      billing: 'billing',
      blockedUsers: 'blocked-users',
      notifications: 'notifications',
      security: 'security',
      securityLog: 'security-log',
    },
    user: {
      root: 'users',
      overview: 'overview',
      profile: ':username',
    },
    errorResponse: {
      notFound: '404',
    },
  },
};
