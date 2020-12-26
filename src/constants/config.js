// const localURL = 'http://192.168.1.10:3100';
const prodURL = 'http://derjava.creograf.ru';
const localURL = 'http://192.168.0.113:3100';

const defaultConfig = {
  IP: `${localURL}/api`,
  mediaIP: `${localURL}/photos`,
  tokenName: 'APP_NAMEDevClientToken',
};
// const defaultConfig = { IP: 'PROD_IP', tokenName: 'APP_NAMEClientToken' };
// http://derjava.creograf.ru/api
// http://192.168.0.240:3100/api

export const host = `${defaultConfig.IP}`;
export const mediaHost = `${defaultConfig.mediaIP}`;
export const { tokenName } = defaultConfig;
