import Link from 'next/link';
import { HomeIcon, Cog6ToothIcon, ChartBarIcon, FolderOpenIcon, SparklesIcon } from '@heroicons/react/24/outline';
type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  active?: boolean;
  badge?: string;
};

type NavGroup = {
  header: string;
  items: NavItem[];
};

const navGroups: NavGroup[] = [
  {
    header: '', // Remove 'MENU' header
    items: [
      {
        label: 'Dashboard',
        href: '/',
        icon: HomeIcon,
        active: true,
      },
    ],
  },
  {
    header: 'PIPELINES',
    items: [
      {
        label: 'Edit Pipeline',
        href: '/pipelines/edit',
        icon: Cog6ToothIcon,
      },
      {
        label: 'Pipeline Runs',
        href: '/pipelines/runs',
        icon: ChartBarIcon,
        badge: 'NEW',
      },
    ],
  },
  {
    header: 'STORAGE',
    items: [
      {
        label: 'Config Connectors',
        href: '/storage/config-connectors',
        icon: Cog6ToothIcon,
      },
      {
        label: 'Storage Viz',
        href: '/storage/storage-viz',
        icon: FolderOpenIcon,
      },
    ],
  },
];

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setCollapsed, toggleCollapsed } from '../store/sidebarSlice';
import { useRouter } from 'next/router';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';


const Sidebar = () => {
  const collapsed = useSelector((state: RootState) => state.sidebar.collapsed);
  const dispatch = useDispatch();
  const router = useRouter();
  return (
  <aside className={`relative h-full bg-gray-950 text-gray-100 flex flex-col shadow-xl border-r border-gray-900 transition-all duration-300 ${collapsed ? 'w-16' : 'w-72'}`}>
      {/* Logo Area + Collapse Button */}
      <div className="flex items-center gap-3 p-6 border-b border-gray-900">
        <div className="flex items-center gap-3 w-full">
          <div className="bg-green-500 rounded-full h-10 w-10 flex items-center justify-center">
            <SparklesIcon className="h-6 w-6 text-white" />
          </div>
          {!collapsed && <span className="font-bold text-2xl text-gray-100 tracking-tight">ZabalAI</span>}
        </div>
      </div>
      {/* Floating collapse/expand button at bottom */}
      <button
  onClick={() => dispatch(toggleCollapsed())}
  className="absolute bottom-6 -right-4 z-20 bg-gray-900 rounded-full p-2 border border-gray-800 hover:ring-2 hover:ring-green-400 flex items-center justify-center shadow-lg"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        style={{ transition: 'right 0.3s, bottom 0.3s' }}
      >
        {collapsed ? (
          <ChevronRightIcon className="h-5 w-5 text-green-400 block" />
        ) : (
          <ChevronLeftIcon className="h-5 w-5 text-green-400 block" />
        )}
      </button>
      {/* Navigation Groups */}
      <nav className={`flex-1 py-6 space-y-6 ${collapsed ? 'px-1' : 'px-4'}`}>
        {navGroups.map((group, i) => (
          <div key={group.header}>
            {group.header && !collapsed && (
              <div className="text-xs font-semibold text-gray-400 mb-2 pl-2">{group.header}</div>
            )}
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive = router.pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center ${collapsed ? 'justify-center' : ''} gap-3 px-2 py-2 rounded-lg transition-colors font-medium text-gray-200 hover:bg-green-900/30 ${isActive ? 'bg-green-900/40' : ''}`}
                    >
                      <item.icon className={`h-5 w-5 text-green-400 ${collapsed ? 'mx-auto' : ''}`} />
                      {!collapsed && <span className="flex-1">{item.label}</span>}
                      {item.badge && !collapsed && <span className="ml-2 px-2 py-0.5 text-xs rounded bg-green-600 text-white">{item.badge}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
            {i < navGroups.length - 1 && !collapsed && <div className="my-4 border-t border-gray-800" />}
          </div>
        ))}
      </nav>
      <div className={`p-4 text-xs text-gray-600 border-t border-gray-900 flex items-center gap-2 ${collapsed ? 'justify-center' : ''}`}>
        <span>© 2025 Zabalai</span>
      </div>
    </aside>
  );
};

export default Sidebar;
