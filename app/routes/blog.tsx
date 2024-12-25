import { Outlet } from 'react-router';

import { DefaultLayout } from '~/modules/core/components/layouts/DefaultLayout';

export default function Blog() {
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
}
