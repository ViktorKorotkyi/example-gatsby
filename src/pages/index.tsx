import React, { useState } from 'react';
import {
  graphql, navigate, HeadFC, PageProps
} from 'gatsby';
import {
  Trans, useTranslation, Link, useI18next
} from 'gatsby-plugin-react-i18next';

import { loginTest } from '../utils/authMock.ts';

interface MainPageData {
  contentfulMainPage: {
    id: string;
    title: string;
    description: {
      raw: string;
    };
    background: {
      url: string;
    };
  };
}

type Props = PageProps<MainPageData>;

function IndexPage({ data }: Props) {
  const { t } = useTranslation();
  const { languages, originalPath } = useI18next();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    const dataRequest = await loginTest(login, password);

    if (dataRequest?.status === 'ok' && dataRequest?.token) {
      localStorage.setItem('token', dataRequest?.token);
      navigate('/dashboard/');
    } else {
      setError(dataRequest.status);
    }
  };

  return (
    <main className="w-full min-h-screen flex items-center justify-center bg-[#c6def4]">
      <div
        className="w-[500px] h-[450px] flex items-center justify-between flex-col border p-6 pb-12 rounded-lg bg-[#fff]"
      >
        <h1 className="text-[36px] z-10 font-bold">
          { data?.contentfulMainPage?.title || '' }
        </h1>
        <div className="w-full max-w-[80%] flex items-center justify-between">
          <span>
            <Trans>Welcome to my Gatsby site!</Trans>
          </span>

          <ul className="flex items-center gap-x-3">
            {languages.map((lng) => (
              <li key={lng}>
                <Link
                  to={originalPath}
                  language={lng}
                  placeholder="Language Link"
                  className="flex justify-center items-center w-[35px] border-2 rounded-md p-1"
                >
                  {lng}
                </Link>
              </li>
            ))}
          </ul>

        </div>

        <div className="w-full flex flex-col items-center justify-between">
          <div className="w-[80%] mb-4">
            <p className="mb-2">{t('Login')}</p>
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

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: {ns: {in: ["home",]}, language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
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
`;

export const Head: HeadFC = function Head() {
  return <title>Home Page</title>;
};
