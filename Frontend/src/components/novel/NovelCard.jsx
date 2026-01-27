import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaBookOpen, FaArrowRight } from 'react-icons/fa';
import { getImagePlaceholder } from '../../utils/helpers';
import NovelService from '../../services/novel.service';
import { useLanguage } from '../../context/LanguageContext';

const NovelCard = ({ novel, compact = false }) => {
  const { t } = useLanguage();
  if (!novel) return null;

  const { title, author, description, genres, calculatedStats, totalChapters, viewCount } = novel;

  // Make sure we have an author object that's not null
  const authorName = author?.username || t('novel.unknown');
  const authorId = author?.id || author?._id || '';

  // Get novel ID (supporting both id and _id formats)
  const novelId = novel.id || novel._id || '';

  // Generate placeholder if no cover
  const placeholder = getImagePlaceholder(title);

  // Determine if we have a cover image by checking if the cover property exists
  const hasCover = !!novel.cover;

  // Get cover URL if available
  const coverUrl = hasCover ? NovelService.getNovelCoverUrl(novelId) : null;

  if (compact) {
    return (
      <Link to={`/novels/${novelId}`} className="flex items-start p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
        <div className="flex-shrink-0 w-12 h-16 rounded-md overflow-hidden">
          {hasCover ? (
            <img
              src={coverUrl}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.backgroundColor = placeholder.color;
                e.target.src = '';
                e.target.alt = placeholder.initials;
              }}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-white text-xl font-bold"
              style={{ backgroundColor: placeholder.color }}
            >
              {placeholder.initials}
            </div>
          )}
        </div>

        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">{title}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">{t('novel.by')} {authorName}</p>
          <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
            <FaStar className="text-yellow-400 mr-1" />
            <span className="mr-2">{(calculatedStats?.averageRating || 0).toFixed(1)}</span>
            <FaBookOpen className="mr-1" />
            <span className="mr-2">{totalChapters || 0}</span>
          </div>
        </div>
      </Link>
    );
  }

  // Standard novel card display (matching HomePage style)
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl relative">
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <Link to={`/novels/${novelId}`} className="block relative">
        <div className="relative aspect-w-2 aspect-h-3 w-full">
          {hasCover ? (
            <img
              src={coverUrl}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.backgroundColor = placeholder.color;
                e.target.src = '';
                e.target.alt = placeholder.initials;
              }}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-white text-2xl font-bold"
              style={{ backgroundColor: placeholder.color }}
            >
              {placeholder.initials}
            </div>
          )}

          {/* Overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
            <h3 className="text-white font-semibold line-clamp-2">{title}</h3>
            <p className="text-gray-200 text-sm">{t('novel.by')} {authorName}</p>
          </div>
        </div>
      </Link>

      <div className="p-3 flex justify-between items-center bg-white dark:bg-gray-800 relative z-10">
        <div className="flex items-center text-xs text-gray-600 dark:text-gray-300 gap-3">
          <span className="flex items-center"><FaStar className="text-amber-400 mr-1" /> {(calculatedStats?.averageRating || 0).toFixed(1)}</span>
          <span className="flex items-center"><FaBookOpen className="mr-1" /> {totalChapters || 0}</span>
        </div>

        <Link
          to={`/novels/${novelId}`}
          className="text-indigo-600 dark:text-indigo-400 text-xs hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center"
        >
          {t('homePage.read')} <FaArrowRight className="inline ml-1 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default NovelCard;