import React, { useEffect } from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { Link } from 'gatsby';

import useStore from '../store/test.ts';
import useStoreFetch from '../store/testFetch.ts';
import { logoutTest } from '../utils/authMock.ts';
import PrivateRoute from '../components/PrivateRoute.tsx';

function DashboardPage() {
  const count = useStore((state) => state.count);
  const increaseCount = useStore((state) => state.increaseCount);
  const decreaseCount = useStore((state) => state.decreaseCount);

  const { catFact, error, fetchCatFact } = useStoreFetch();

  useEffect(() => {
    fetchCatFact();
  }, [fetchCatFact]);

  return (
    <main className="w-full min-h-screen flex justify-center bg-[#c6def4] p-6">
      <div
        className="w-full flex flex-col p-6 pb-12 rounded-lg bg-[#fff] "
      >
        <div className="w-full flex items-center mb-10 justify-between border-b-2 border-black">
          <div className="flex items-center justify-between">
            <h1 className="text-[36px] z-10 font-bold ">
              DASHBOARD
            </h1>
            <div className="flex items-center justify-between ml-10">
              <Link to="/blogs/blog-1" className="text-2xl hover:opacity-70 mr-5">Blog 1</Link>
              <Link to="/blogs/blog-2" className="text-2xl hover:opacity-70">Blog 2</Link>
            </div>
          </div>
          <button
            className="w-20 h-10 text-base rounded-md bg-slate-400 hover:opacity-80"
            onClick={logoutTest}
            type="button"
          >
            Logout
          </button>
        </div>

        <div className=" w-[30%] max-w-140 mb-10 flex flex-col items-center">
          <span className="mb-2 text-base">State counter example</span>
          <span className="mb-2 text-base">
            {count}
          </span>
          <div className="w-full flex justify-between items-center gap-1">
            <button
              onClick={increaseCount}
              className="w-full h-[40px] text-base rounded-md bg-slate-400 hover:opacity-80"
              type="button"
            >
              Up
            </button>
            <button
              onClick={decreaseCount}
              className="w-full h-[40px] text-base rounded-md bg-slate-400 hover:opacity-80"
              type="button"
            >
              Down
            </button>
          </div>
        </div>
        <div className="w-full border-1 flex flex-col">
          <h2 className="text-xl mb-2 font-bold">Info about Cat:</h2>
          <span>
            {catFact || error || 'No cat fact available'}
          </span>
        </div>

      </div>
    </main>
  );
}

export default function Dashboard(props: PageProps) {
  return <PrivateRoute component={DashboardPage} {...props} />;
}

export const Head: HeadFC = function Head() {
  return <title>Dashboar Page</title>;
};
