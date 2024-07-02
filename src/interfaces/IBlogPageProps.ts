/* eslint-disable semi */
export default interface IBlogPageProps {
  data?: {
    contentfulTopic: {
      title: string;
      slug: string;
      url: string;
      id: string;
      description: string;
      image: {
        url: string;
      };
      content: {
        raw: string;
      }
    };
  };
};
