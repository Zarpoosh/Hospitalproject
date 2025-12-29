import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  action?: boolean;
}

interface SidebarProps {
  items: SidebarItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onActionClick?: () => void;
  todayAppointments: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  items,
  activeTab,
  onTabChange,
  onActionClick,
  todayAppointments,
}) => {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900 min-h-[calc(100vh-80px)] hidden md:block">
      <nav className="p-6">
        <div className="space-y-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
            <h3 className="font-medium text-blue-700 dark:text-blue-300 mb-2">امروز</h3>
            <p className="text-2xl font-bold dark:text-gray-100">{new Date().toLocaleDateString('fa-IR')}</p>
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">{todayAppointments} قرار ملاقات</p>
          </div>
          
          <div className="space-y-2">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => item.action ? onActionClick?.() : onTabChange(item.id)}
                  className={`w-full flex items-center p-3 rounded-xl transition-colors ${
                    isActive && !item.action
                      ? `${item.bgColor} ${item.color}`
                      : item.action
                      ? `hover:${item.bgColor} ${item.color}`
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="w-5 h-5 ml-2" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;