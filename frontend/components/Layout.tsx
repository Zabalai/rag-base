import Sidebar from './Sidebar';
import Topbar from './Topbar';


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
