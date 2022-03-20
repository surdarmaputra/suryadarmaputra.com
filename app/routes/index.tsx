import DefaultLayout from '~/components/layouts/DefaultLayout';
import BrandHero from '~/components/sections/BrandHero';
import PostSummary from '~/components/sections/PostSummary';

const post = {
  title: 'The Books I Read in 2020',
  date: new Date(),
  excerpt:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam a tincidunt sapien. Sed vehicula vel sapien vel viverra. Praesent congue quis ex vel rutrum. Nulla facilisi. Curabitur molestie vestibulum nisl lacinia tempus. Donec in ipsum ut urna scelerisque viverra.',
  href: '#',
  minutesToRead: 5,
  tags: ['javascript'],
};

const posts = [
  { ...post, id: 1 },
  { ...post, title: 'Mengenal Makefile', id: 2 },
  { ...post, title: 'Melakukan Update Dependensi NPM', id: 3 },
];

export default function Index() {
  return (
    <DefaultLayout>
      <BrandHero />
      <div className="grid grid-cols-2 gap-10">
        {posts.map(({ id, ...postData }) => (
          <PostSummary key={id} {...postData} />
        ))}
      </div>
    </DefaultLayout>
  );
}
