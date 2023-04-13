const apiUrl = 'https://norma.nomoreparties.space/api';

const config = {
  ingredientsUrl: `${apiUrl}/ingredients`,
  orderUrl: `${apiUrl}/orders/`,
  loginUrl: `${apiUrl}/auth/login/`,
  createUserUrl: `${apiUrl}/auth/register/`,
  logoutUrl: `${apiUrl}/auth/logout/`,
  tokenUrl: `${apiUrl}/auth/token/`,
  forgotPasswordUrl: `${apiUrl}/password-reset/`,
  passwordResetUrl: `${apiUrl}/password-reset/reset`,
};

export default config;
