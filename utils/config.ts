const config = {
  hostDomain: process.env.NEXT_PUBLIC_ENV_HOST_DOMAIN,
  hostURL: process.env.NEXT_PUBLIC_ENV_HOST_URL,
  apiBaseURL: process.env.NEXT_PUBLIC_ENV_API_URL,
  gaTrackingID: process.env.NEXT_PUBLIC_ENV_GA_TRACKING_ID,
  authHeaderKey: 'x-auth-token',
  cookieAuthHeaderKey: 'access-token',
};

export default config;
