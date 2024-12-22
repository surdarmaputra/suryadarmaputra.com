import { Outlet } from 'react-router';

import { DefaultLayout } from '~/components/layouts/DefaultLayout';

export default function Blog() {
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
}
