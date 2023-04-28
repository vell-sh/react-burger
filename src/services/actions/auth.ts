import { createAsyncThunk } from '@reduxjs/toolkit';
import config from '../../config/config';
import { IRegisterUser, ILoginUser, IResetPassword } from '../../types/authTypes';
import { fetchWithRefresh, getCookie, request, setCookie } from '../../utils/utils';

export const getUser = createAsyncThunk('getUser/get', async () => {
  const token = getCookie('accessToken');
  const result = await fetchWithRefresh(config.getUserUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return result;
});

export const registerUser = createAsyncThunk('register/post', async (data: IRegisterUser) => {
  const res = await request(config.createUserUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
    }),
  });
  setCookie('accessToken', null, {});
  setCookie('refreshToken', null, {});
  return res;
});

export const loginUser = createAsyncThunk('login/post', async (form: ILoginUser) => {
  const res = await request(config.loginUrl, {
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
  const authToken = res.accessToken.split('Bearer ')[1];
  setCookie('accessToken', authToken, {});
  setCookie('refreshToken', res.refreshToken, {});
  return res;
});

export const logoutUser = createAsyncThunk('logout/post', async (token: string) => {
  const res = await request(config.logoutUrl, {
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
  return res;
});

export const forgotPassword = createAsyncThunk('forgotPassword/post', async (email: string) => {
  const res = await request(config.forgotPasswordUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  return res;
});

export const resetPassword = createAsyncThunk(
  'resetPassword/post',
  async ({ password, token }: IResetPassword) => {
    const res = await request(config.resetPasswordUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, token }),
    });
    return res;
  }
);
