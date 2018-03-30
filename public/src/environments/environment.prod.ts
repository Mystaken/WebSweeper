export const environment = {
  production: true,
  domain: 'https://web-sweeper.herokuapp.com',
  peerConfig: {
    host: 'https://web-sweeper.herokuapp.com',
    port: process.env.PORT,
    path:  '/peer'
  }
};
