import { Outlet } from 'remix';

import { DefaultLayout } from '~/components/layouts/DefaultLayout';

export default function Blog() {
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
}
