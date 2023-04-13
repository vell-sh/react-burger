import { createAsyncThunk } from '@reduxjs/toolkit';
import config from '../../config/config';
import { checkResponse, fetchWithRefresh, setCookie } from '../../utils/utils';

interface ICreateUserForm {
  name: string;
  email: string;
  password: string;
}

interface ILoginUserForm {
  email: string;
  password: string;
}
interface IResetPasswordForm {
  password: string;
  token: string;
}

export const getUser = createAsyncThunk('getUser/get', async (token: string) => {
  const result = await fetchWithRefresh(config.getUserUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: token,
    },
  });
  return result;
});

export const registerUser = createAsyncThunk('register/post', async (form: ICreateUserForm) => {
  const result = await fetchWithRefresh(config.createUserUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name: form.name,
      email: form.email,
      password: form.password,
    }),
  });
  const authToken = result.accessToken.split('Bearer ')[1];
  setCookie('accessToken', authToken, {});
  setCookie('refreshToken', result.refreshToken, {});
  return result;
});

export const loginUser = createAsyncThunk('login/post', async (form: ILoginUserForm) => {
  const result = await fetchWithRefresh(config.loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      email: form.email,
      password: form.password,
    }),
  });
  const authToken = result.accessToken.split('Bearer ')[1];
  setCookie('accessToken', authToken, {});
  setCookie('refreshToken', result.refreshToken, {});
  return result;
});

export const logoutUser = createAsyncThunk('logout/post', async (token: string) => {
  try {
    const res = await fetch(config.logoutUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
      }),
    });
    setCookie('accessToken', null, {});
    setCookie('refreshToken', null, {});
    const result = await checkResponse(res);
    return result;
  } catch (err: any) {
    return Promise.reject(err);
  }
});

export const forgotPassword = createAsyncThunk('forgotPassword/post', async (email: string) => {
  try {
    const res = await fetch(config.forgotPasswordUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const result = await checkResponse(res);
    return result;
  } catch (err: any) {
    return Promise.reject(err);
  }
});

export const resetPassword = createAsyncThunk(
  'resetPassword/post',
  async ({ password, token }: IResetPasswordForm) => {
    try {
      const res = await fetch(config.resetPasswordUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, token }),
      });
      const result = await checkResponse(res);
      return result;
    } catch (err: any) {
      return Promise.reject(err);
    }
  }
);
