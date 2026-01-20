import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Layout from './Layout';
import { useLanguage } from '../../context/LanguageContext';

const AdminLayout = () => {
  const { t } = useLanguage();

  const navLinkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-indigo-600 text-white'
        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
    }`;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-64">
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3">
              <div className="text-sm font-semibold text-gray-900 dark:text-white px-3 py-2">{t('adminLayout.title')}</div>
              <nav className="mt-2 space-y-1">
                <NavLink end to="/admin" className={navLinkClass}>{t('adminLayout.overview')}</NavLink>
                <NavLink to="/admin/users" className={navLinkClass}>{t('adminLayout.users')}</NavLink>
                <NavLink to="/admin/novels" className={navLinkClass}>{t('adminLayout.novels')}</NavLink>
                <NavLink to="/admin/comments" className={navLinkClass}>{t('adminLayout.comments')}</NavLink>
              </nav>
            </div>
          </aside>

          <section className="flex-1 min-w-0">
            <Outlet />
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default AdminLayout;
