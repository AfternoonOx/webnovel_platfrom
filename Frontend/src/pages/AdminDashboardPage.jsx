import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaBookOpen, FaRegCommentDots, FaArrowRight } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

const AdminDashboardPage = () => {
  const { t } = useLanguage();

  return (
    <div className="relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl dark:bg-indigo-500/20" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl dark:bg-purple-900/20" />
      </div>

      <div className="space-y-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              {t('adminDashboard.title')}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl text-sm md:text-base">
              {t('adminDashboard.subtitle')}
            </p>
          </div>


        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Users Module */}
          <ModuleCard
            to="/admin/users"
            icon={<FaUsers className="w-6 h-6" />}
            title={t('adminDashboard.modules.users.title')}
            description={t('adminDashboard.modules.users.description')}
            stats={t('adminDashboard.modules.users.stats')}
            color="indigo"
          />

          {/* Novels Module */}
          <ModuleCard
            to="/admin/novels"
            icon={<FaBookOpen className="w-6 h-6" />}
            title={t('adminDashboard.modules.novels.title')}
            description={t('adminDashboard.modules.novels.description')}
            stats={t('adminDashboard.modules.novels.stats')}
            color="purple"
          />

          {/* Comments Module */}
          <ModuleCard
            to="/admin/comments"
            icon={<FaRegCommentDots className="w-6 h-6" />}
            title={t('adminDashboard.modules.comments.title')}
            description={t('adminDashboard.modules.comments.description')}
            stats={t('adminDashboard.modules.comments.stats')}
            color="fuchsia"
          />
        </div>



      </div>
    </div>
  );
};

const ModuleCard = ({ to, icon, title, description, stats, color }) => {
  const colorVariants = {
    indigo: "group-hover:bg-indigo-600 group-hover:text-white text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-300",
    purple: "group-hover:bg-purple-600 group-hover:text-white text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-300",
    fuchsia: "group-hover:bg-fuchsia-600 group-hover:text-white text-fuchsia-600 bg-fuchsia-50 dark:bg-fuchsia-900/20 dark:text-fuchsia-300",
  };

  const borderVariants = {
    indigo: "hover:border-indigo-200 dark:hover:border-indigo-800",
    purple: "hover:border-purple-200 dark:hover:border-purple-800",
    fuchsia: "hover:border-fuchsia-200 dark:hover:border-fuchsia-800",
  };

  return (
    <Link
      to={to}
      className={`group relative flex flex-col justify-between p-6 h-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${borderVariants[color]}`}
    >
      <div>
        <div className={`mb-4 w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${colorVariants[color]}`}>
          {icon}
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {title}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
          {description}
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700/50">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {stats}
        </span>
        <div className="p-1.5 rounded-full bg-gray-50 dark:bg-gray-700 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 transition-colors">
          <FaArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-transform duration-300 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
};

export default AdminDashboardPage;