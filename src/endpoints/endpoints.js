import axios from 'react-native-axios';

export async function registerUser(email, password, firstname, lastname) {
  const URL = 'https://saudi-seasons-riyadh.us.dev.monkapps.com/api/login/register';
  const data = {
    email,
    password,
    first_name: firstname,
    last_name: lastname,
  };

  return axios.post(URL, data).then(response => response);
}

export async function loginUser(email, password) {
  const URL = 'https://saudi-seasons-riyadh.us.dev.monkapps.com/api/login';
  const data = {
    email,
    password,
  };

  return axios.post(URL, data).then(response => response);
}

export async function loginUserGoogle(token) {
  const URL = 'https://saudi-seasons-riyadh.us.dev.monkapps.com/api/login/google';
  const data = {
    token,
  };

  return axios.post(URL, data).then(response => response);
}
