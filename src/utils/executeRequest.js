import { host } from '../constants';

export const executeRequest = async ({
  method, url, token, body,
}) => {
  const headers = {};
  if (body) {
    headers['Content-Type'] = body.contentType;
  }

  if (token) {
    headers.Authorization = token;
  }

  return new Promise(async (resolve, reject) => {
    const response = await fetch(`${host}/${url}`, {
      method,
      headers,
      body: body ? body.content : undefined,
    })
      .then(res => res.json())
      .catch((error) => {
        console.log(error);
        reject('Oшибка подключения');
      });

    switch (response.status) {
    case 0:
      resolve(response);
      break;
    case 1:
      reject('Некорректные данные');
      break;
    case 2:
      reject('Нет доступа');
      break;
    case 3:
      reject('Пользователь не найден');
      break;
    case 4:
      reject('Такой пользователь уже существует');
      break;
    default:
      reject('Ошибка сервера');
      break;
    }
  });
};
