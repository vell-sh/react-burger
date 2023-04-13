/* eslint-disable no-useless-escape */
import config from '../config/config';

// ---------- fetch with refresh ---------- //

export const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
};

export const refreshToken = async () => {
  const res = await fetch(config.refreshTokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: getCookie('refreshToken'),
    }),
  });
  return checkResponse(res);
};

export const fetchWithRefresh = async (url: string, options: RequestInit) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      setCookie('refreshToken', refreshData.refreshToken, {});
      setCookie('accessToken', refreshData.accessToken, {});
      const headersInit = refreshData.accessToken;
      options.headers = headersInit;
      const res = await fetch(url, options); //повторяем запрос
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

// ---------- cookie ---------- //

export const getCookie = (name: string) => {
  let matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (
  name: string,
  value: string | number | boolean | null,
  props: { [key: string]: Date | number | string | boolean }
) => {
  props = {
    path: '/',
    ...props,
  };
  if (props.expires instanceof Date) {
    props.expires = props.expires.toUTCString();
  }
  let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value || '');
  for (let optionKey in props) {
    updatedCookie += '; ' + optionKey;
    let optionValue = props[optionKey];
    if (optionValue !== true) {
      updatedCookie += '=' + optionValue;
    }
  }
  document.cookie = updatedCookie;
};

export const deleteCookie = (name: string) => {
  setCookie(name, null, { expires: -1 });
};
