const CLIENT_ID = process.env.CLIENT_ID || '0oanuseooUTP22YMM5d6';
const ISSUER = process.env.ISSUER || 'https://dev-77393568.com/oauth2/default';
const OKTA_TESTING_DISABLEHTTPSCHECK = process.env.OKTA_TESTING_DISABLEHTTPSCHECK || false;
const REDIRECT_URI = `${window.location.origin}/`;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    oidc: {
      clientId: '0oanuseooUTP22YMM5d6',
      issuer: 'https://dev-77393568.okta.com/oauth2/default',
      redirectUri: 'http://localhost:3000/',
      scopes: ['openid', 'profile', 'email'],
      pkce: true,
      disableHttpsCheck: false,
    },
    resourceServer: {
      messagesUrl: 'http://localhost:8000/api/messages',
    },
};
