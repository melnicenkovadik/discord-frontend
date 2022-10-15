import Sidebar from './sidebar';
import FriendsSidebar from '../FriendsSidebar';

export function Layout({ children }: any) {
  return (
    <div className="w-[100%] bg-gradient-to-r from-[#333c5a] to-transparent h-[100vh] bg-[#333c5a] flex">
      <Sidebar />
      <FriendsSidebar />
      {children}
    </div>
  );
}
