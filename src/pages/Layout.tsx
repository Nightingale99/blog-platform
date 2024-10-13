import { Header } from '@/components/shared/Header';
import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="font-roboto text-black">
      <Header className="mb-6" />
      <Outlet />
    </div>
  );
}
