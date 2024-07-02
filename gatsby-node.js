const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    query Blogs {
      allContentfulTopic {
        edges {
          node {
              url
              id
            }
          }
        }
      }
  `);

  data.allContentfulTopic.edges.forEach((element) => {
    const { url, id } = element.node;
    actions.createPage({
      path: `/blogs/${url}`,
      component: path.resolve('./src/templates/blog.tsx'),
      context: {
        url,
        id
      }
    });
  });
};
