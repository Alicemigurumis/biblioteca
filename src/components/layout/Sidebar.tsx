import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Film, 
  Tv, 
  BookOpen, 
  Tag, 
  Star, 
  ChevronLeft, 
  ChevronRight,
  Library
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleSidebar }) => {
  const sidebarVariants = {
    expanded: { width: '240px' },
    collapsed: { width: '72px' }
  };

  return (
    <motion.div 
      className="h-screen bg-background-secondary flex flex-col border-r border-background-tertiary"
      initial={false}
      animate={collapsed ? 'collapsed' : 'expanded'}
      variants={sidebarVariants}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4 flex items-center justify-between border-b border-background-tertiary">
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <Library size={24} className="text-primary-500" />
            <h1 className="font-bold text-lg">MediaVault</h1>
          </motion.div>
        )}
        {collapsed && <Library size={24} className="text-primary-500 mx-auto" />}
        <button 
          onClick={toggleSidebar}
          className="p-1 rounded-full hover:bg-background-tertiary transition-colors text-text-secondary"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        <div className={`${!collapsed && 'px-3'} mb-2`}>
          {!collapsed && <h2 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-2 px-2">Main</h2>}
          <ul className="space-y-1">
            <li>
              <NavLink to="/" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''} ${collapsed ? 'justify-center px-0' : ''}`}>
                <Home size={20} />
                {!collapsed && <span>Dashboard</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/movies" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''} ${collapsed ? 'justify-center px-0' : ''}`}>
                <Film size={20} />
                {!collapsed && <span>Movies</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/tv-shows" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''} ${collapsed ? 'justify-center px-0' : ''}`}>
                <Tv size={20} />
                {!collapsed && <span>TV Shows</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/books" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''} ${collapsed ? 'justify-center px-0' : ''}`}>
                <BookOpen size={20} />
                {!collapsed && <span>Books</span>}
              </NavLink>
            </li>
          </ul>
        </div>

        {!collapsed && (
          <>
            <div className="px-3 mb-2">
              <h2 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-2 px-2">Collections</h2>
              <ul className="space-y-1">
                <li>
                  <NavLink to="/tags/favorites" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <Star size={20} />
                    <span>Favorites</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/tags/to-watch" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <Tag size={20} />
                    <span>To Watch</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/tags/sci-fi" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <Tag size={20} />
                    <span>Sci-Fi</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/tags/mystery" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <Tag size={20} />
                    <span>Mystery</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </>
        )}
      </nav>
    </motion.div>
  );
};

export default Sidebar;