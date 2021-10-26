import axios from 'axios';

class JwtService {
  createUser = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/v1/auth/register', data)
        .then((response) => {
          if (response.data.user) {
            this.setSession(response.data.tokens.accessToken);
            resolve(response.data.user);
          } else {
            reject(response.data.error);
          }
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  };

  signInWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/v1/auth/login', {
          email,
          password,
        })
        .then((response) => {
          if (response.data.user) {
            this.setSession(response.data.tokens.accessToken);
            resolve(response.data.user);
          } else {
            reject(response.data.error);
          }
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  };

  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem('jwt_access_token', access_token);
      axios.defaults.headers.common.Authorization = `Bearer Token ${access_token}`;
    } else {
      localStorage.removeItem('jwt_access_token');
      delete axios.defaults.headers.common.Authorization;
    }
  };

  logout = () => {
    this.setSession(null);
  };

  getAccessToken = () => {
    return window.localStorage.getItem('jwt_access_token');
  };

  getAuthHeaders = () => {
    return {
      Authorization: `Bearer ${this.getAccessToken()}`,
    };
  };
}

const instance = new JwtService();

export default instance;
