import React from 'react';
import { graphql, PageProps, HeadFC } from 'gatsby';

import PrivateBlogRoute from '../components/PrivateBlogRouteProps.tsx';
import IBlogPageProps from '../interfaces/IBlogPageProps.ts';

function BlogPage(props: IBlogPageProps) {
  const { data } = props;
  console.log('AAAAAA', data?.contentfulTopic || '');

  return (
    <main className="w-full min-h-screen flex justify-center bg-[#c6def4] p-6">
      <div className="w-full flex flex-col p-6 pb-12 rounded-lg bg-[#fff]">
        BLOG
      </div>
    </main>
  );
}

export const query = graphql`
  query BlogQuery($url: String!) {
    contentfulTopic(url: { eq: $url }) {
      title
      slug
      url
      id
      description
      image {
        url
      }
    }
  }
`;

function Blog(props: PageProps) {
  return (
    <PrivateBlogRoute component={BlogPage} {...props} />
  );
}

export default Blog;

export const Head: HeadFC = function Head() {
  return <title>Blog Page</title>;
};
