const apiUrl = 'https://norma.nomoreparties.space/api';

const config = {
  ingredientsUrl: `${apiUrl}/ingredients`,
  orderUrl: `${apiUrl}/orders/`,
  loginUrl: `${apiUrl}/auth/login/`,
  getUserUrl: `${apiUrl}/auth/user/`,
  createUserUrl: `${apiUrl}/auth/register/`,
  logoutUrl: `${apiUrl}/auth/logout/`,
  refreshTokenUrl: `${apiUrl}/auth/token/`,
  forgotPasswordUrl: `${apiUrl}/password-reset/`,
  resetPasswordUrl: `${apiUrl}/password-reset/reset`,
};

export default config;
