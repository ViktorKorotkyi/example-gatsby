import * as React from 'react';
import { HeadFC } from 'gatsby';

function NotFoundPage() {
  return (
    <main>
      <h1>Page not found</h1>
      <p>
        Sorry 😔, we couldn’t find what you were looking for.
      </p>
    </main>
  );
}

export default NotFoundPage;

export const Head: HeadFC = function Head() {
  return <title>Not found</title>;
};
