export const logoutTest = () => {
  localStorage.removeItem('token');
  window.location.reload();
};

interface LoginResponse {
  status: string;
  token?: string;
}

export const loginTest = async (login: string, password: string) => new Promise<LoginResponse>(
  (resolve) => {
    setTimeout(() => {
      if (login === 'admin' && password === 'admin') {
        resolve({ status: 'ok', token: 'token' });
      } else {
        resolve({ status: 'invalid login or password', token: '' });
      }
    }, 1000);
  },
);
