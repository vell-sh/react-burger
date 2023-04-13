import { createAsyncThunk } from '@reduxjs/toolkit';
import config from '../../config/config';
import { fetchWithRefresh, setCookie } from '../../utils/utils';

interface ICreateUserForm {
  name: string;
  email: string;
  password: string;
}

interface ILoginUserForm {
  email: string;
  password: string;
}

export const getUser = createAsyncThunk('getUser/get', async (token: string) => {
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

/*
export const forgotPassword = createAsyncThunk('forgotPassword/post', async (token: string) => {
  const response = await fetch(config.createUserUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(token),
  });
  if (!response.ok) {
    return response.json().then(err => Promise.reject(err));
  }
  return (await response.json()) as IRefreshToken;
});

export const resetPassword = createAsyncThunk('resetPassword/post', async (token: string) => {
  const response = await fetch(config.createUserUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(token),
  });
  if (!response.ok) {
    return response.json().then(err => Promise.reject(err));
  }
  return (await response.json()) as IRefreshToken;
});
*/
