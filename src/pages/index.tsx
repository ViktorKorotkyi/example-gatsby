import React, { useState } from 'react';
import {
  useStaticQuery, graphql, navigate, HeadFC,
} from 'gatsby';

import { loginTest } from '../utils/authMock.ts';

function IndexPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { contentfulMainPage } = useStaticQuery(graphql`
    query MyQuery {
      contentfulMainPage {
        id
        title
        description {
          raw
        }
        background {
          url
        }
      }
    }
  `);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    const data = await loginTest(login, password);

    if (data?.status === 'ok' && data?.token) {
      localStorage.setItem('token', data?.token);
      navigate('/dashboard/');
    } else {
      setError(data.status);
    }
  };

  return (
    <main className="w-full min-h-screen flex items-center justify-center bg-[#c6def4]">
      <div
        className="w-[500px] h-[450px] flex items-center justify-between flex-col border p-6 pb-12 rounded-lg bg-[#fff]"
      >
        <h1 className="text-[36px] z-10 font-bold">
          {contentfulMainPage.title}
        </h1>
        <div className="w-full flex flex-col items-center justify-between">
          <div className="w-[80%] mb-4">
            <p className="mb-2">Login</p>
            <input value={login} onChange={handleChange} className="border w-full h-[40px] p-2" />
          </div>
          <div className="w-[80%]">
            <p className="mb-2">Password</p>
            <input
              value={password}
              onChange={handlePasswordChange}
              className="border w-full h-[40px] p-2"
              type="password"
            />
            {error && <span className="mt-1 mb-1 text-base text-red-400">{error}</span>}
          </div>
        </div>
        <button
          className="w-[80%] h-[40px] text-base rounded-md bg-slate-400 hover:opacity-80"
          onClick={handleSubmit}
          type="button"
        >
          Sign Up
        </button>
      </div>
    </main>
  );
}

export default IndexPage;

export const Head: HeadFC = function Head() {
  return <title>Home Page</title>;
};
