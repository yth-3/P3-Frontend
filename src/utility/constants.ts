export const LOGIN = 'login modal';
export const SIGNUP = 'signup modal';
export const LOGOUT = 'logout modal';
export const PRINCIPAL = 'local storage key for principal';
export const TOKEN_START = 'when the token was created';
export const ONE_HOUR = 60 * 60 * 1000; // 60 seconds times 60 minutes * 1000 milliseconds per second
export const LOGGED_OUT = 'logged out modal';
export const ACCOUNT = 'account settings modal';
export const UNAME_REGEX = /^[a-z0-9_-]{3,20}$/g;
export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
export const PW_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g;
