import type { MetaFunction } from 'react-router';
import { useLoaderData } from 'react-router';

import { getPosts } from '~/modules/blog/services/PostService/getPosts';
import { getCampaigns } from '~/modules/campaign/services/campaign-service/get-campaigns';
import LandingPage from '~/modules/introduction/pages/LandingPage';
import { getProjects } from '~/modules/project/services/ProjectService/getProjects';

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Surya Darma Putra - Software engineer based in Bali, Indonesia',
    },
    {
      name: 'description',
      content:
        "👋 Hello, I'm Surya, a software engineer. I do web development using JavaScript, React and Vue ecosystems.",
    },
    {
      name: 'keywords',
      content: ['software engineer', 'javascript', 'react', 'vue'].join(', '),
    },
  ];
};

export async function loader() {
  const posts = await getPosts();
  const projects = await getProjects();
  const campaigns = await getCampaigns();

  return {
    posts,
    projects,
    campaigns,
  };
}

export default function Index() {
  const { posts, projects, campaigns } = useLoaderData<typeof loader>();

  return (
    <LandingPage campaigns={campaigns} posts={posts} projects={projects} />
  );
}
