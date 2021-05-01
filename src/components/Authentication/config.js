const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const ISSUER = process.env.REACT_APP_ISSUER;
const OKTA_TESTING_DISABLEHTTPSCHECK = process.env.REACT_APP_OKTA_TESTING_DISABLEHTTPSCHECK;
const REDIRECT_URI = `${window.location.origin}/`;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    oidc: {
      clientId: CLIENT_ID,
      issuer: ISSUER,
      redirectUri: REDIRECT_URI,
      scopes: ['openid', 'profile', 'email'],
      pkce: true,
      disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
    },
    resourceServer: {
      messagesUrl: 'http://localhost:8000/api/messages',
    },
};
