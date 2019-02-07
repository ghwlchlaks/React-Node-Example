import axios from 'axios';

export const login = (loginInfo) => {
  return axios.put('/auth/login', {
    username: loginInfo.username,
    password: loginInfo.password
  })
  .then((result) => {
    if (result.status === 200 && result.data.status) return result.data
    else return null;
  })
  .catch((err) => {
    return null;
  })
}

export const signup = (signupInfo) => {
  return axios.post('/auth/signup', {
    username: signupInfo.username,
    password: signupInfo.password,
    email : signupInfo.email,
    sex : signupInfo.sex
  })
}