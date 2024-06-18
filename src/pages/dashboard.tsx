import React from 'react';
import type { HeadFC, PageProps } from 'gatsby';

import useStore from '../store/test.ts';
import { logoutTest } from '../utils/authMock.ts';
import PrivateRoute from '../components/PrivateRoute.tsx';

function DashboardPage() {
  const count = useStore((state) => state.count);
  const increaseCount = useStore((state) => state.increaseCount);
  const decreaseCount = useStore((state) => state.decreaseCount);

  return (
    <main className="w-full min-h-screen flex items-center justify-center bg-[#c6def4]">
      <div className="w-[500px] flex items-center justify-between flex-col border p-6 pb-12 rounded-lg bg-[#fff]">
        <h1 className="text-[36px] z-10 font-bold mb-4">
          DASHBOARD
        </h1>
        <div className="mt-4 mb-4 w-full flex flex-col items-center">
          <span className="mb-2 text-base">State example</span>
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
        <span>
          What is Lorem Ipsum?
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type
          specimen book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was popularised in the
          1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more
          recently with desktop publishing software like Aldus PageMaker including versions of
          Lorem Ipsum.
        </span>
        <button
          className="w-[80%] h-[40px] text-base rounded-md bg-slate-400 hover:opacity-80 mt-6"
          onClick={logoutTest}
          type="button"
        >
          Logout
        </button>
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
