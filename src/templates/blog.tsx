import React from 'react';
import {
  graphql, PageProps, HeadFC, Link
} from 'gatsby';
import { renderRichText } from 'gatsby-source-contentful/rich-text';

import PrivateBlogRoute from '../components/PrivateBlogRouteProps.tsx';
import IBlogPageProps from '../interfaces/IBlogPageProps.ts';

function BlogPage({ data }: IBlogPageProps) {
  return (
    <main className="w-full min-h-screen flex justify-center bg-[#c6def4] p-6">
      <div className="w-full flex flex-col p-6 pb-12 rounded-lg bg-[#fff]">
        <h1 className="text-[36px] font-bold mb-10 ">{data?.contentfulTopic.title}</h1>
        <h2 className="text-4xl font-bold mt-10 mb-10">
          {data?.contentfulTopic.description}
        </h2>
        <div className="w-[30%] mb-10">
          <img src={data?.contentfulTopic?.image?.url || ''} alt="img" />
        </div>
        {data?.contentfulTopic.content.raw && (
          <div className="w-full max-w-[40%] text-base border-t-2 pb-2 mb-10">
            {renderRichText(data?.contentfulTopic?.content)}
          </div>
        )}
        <Link to="/dashboard" className="text-2xl hover:opacity-70">
          {'<--Back'}
        </Link>
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
      content {
        raw
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
