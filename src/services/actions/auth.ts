import { createAsyncThunk } from '@reduxjs/toolkit';
import config from '../../config/config';
import { checkResponse, fetchWithRefresh, getCookie, setCookie } from '../../utils/utils';
import { ICreateUser, ILoginUser, IResetPassword } from '../../types/authTypes';

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

export const registerUser = createAsyncThunk('register/post', async (data: ICreateUser) => {
  const res = await fetch(config.createUserUrl, {
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
  const result = await checkResponse(res);
  return result;
});

export const loginUser = createAsyncThunk('login/post', async (form: ILoginUser) => {
  const res = await fetch(config.loginUrl, {
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
  const result = await checkResponse(res);
  const authToken = result.accessToken.split('Bearer ')[1];
  setCookie('accessToken', authToken, {});
  setCookie('refreshToken', result.refreshToken, {});
  return result;
});

export const logoutUser = createAsyncThunk('logout/post', async (token: string) => {
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
});

export const forgotPassword = createAsyncThunk('forgotPassword/post', async (email: string) => {
  const res = await fetch(config.forgotPasswordUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  const result = await checkResponse(res);
  return result;
});

export const resetPassword = createAsyncThunk(
  'resetPassword/post',
  async ({ password, token }: IResetPassword) => {
    const res = await fetch(config.resetPasswordUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, token }),
    });
    const result = await checkResponse(res);
    return result;
  }
);
