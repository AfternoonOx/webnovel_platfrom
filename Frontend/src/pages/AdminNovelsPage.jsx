import React, { useEffect, useMemo, useState } from 'react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import AdminNovelService from '../services/admin.novel.service';
import { useLanguage } from '../context/LanguageContext';

const AdminNovelsPage = () => {
  const { t } = useLanguage();

  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [search, setSearch] = useState('');

  const params = useMemo(
    () => ({ page, limit, search: search || undefined }),
    [page, limit, search]
  );

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await AdminNovelService.getNovels(params);
      const result = res?.data;
      const list = result?.data;
      setItems(Array.isArray(list) ? list : []);
      setPagination(result?.pagination || null);
    } catch (e) {
      setError(e?.response?.data?.message || t('adminNovels.errors.loadFailed'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [params]);

  const handleFeature = async (id, featured) => {
    try {
      setLoading(true);
      await AdminNovelService.toggleFeature(id, featured);
      await load();
    } catch (e) {
      alert(e?.response?.data?.message || t('adminNovels.errors.actionFailed'));
      setLoading(false);
    }
  };

  const handleDelete = async (id, hard) => {
    if (!window.confirm(hard ? t('adminNovels.confirms.hardDeleteNovel') : t('adminNovels.confirms.softDeleteNovel'))) return;
    try {
      setLoading(true);
      await AdminNovelService.deleteNovel(id, hard);
      await load();
    } catch (e) {
      alert(e?.response?.data?.message || t('adminNovels.errors.deleteFailed'));
      setLoading(false);
    }
  };

  const handleRestore = async (id) => {
    if (!window.confirm(t('adminNovels.confirms.restoreNovel'))) return;
    try {
      setLoading(true);
      await AdminNovelService.restoreNovel(id);
      await load();
    } catch (e) {
      alert(e?.response?.data?.message || t('adminNovels.errors.restoreFailed'));
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5">
        <div className="flex flex-col md:flex-row md:items-end gap-3">
          <div className="flex-1">
            <div className="text-lg font-semibold text-gray-900 dark:text-white">{t('adminNovels.title')}</div>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-3">
                <div className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">{t('adminNovels.filters.search')}</div>
                <input
                  value={search}
                  onChange={(e) => {
                    setPage(1);
                    setSearch(e.target.value);
                  }}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder={t('adminNovels.placeholders.search')}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={limit}
              onChange={(e) => {
                setPage(1);
                setLimit(parseInt(e.target.value, 10));
              }}
              className="rounded-md border border-gray-300 px-2 py-2 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <Button variant="outline" onClick={load} disabled={loading}>{t('adminNovels.actions.refresh')}</Button>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800/60">
              <tr className="text-left text-gray-600 dark:text-gray-300">
                <th className="px-4 py-3 font-medium">{t('adminNovels.table.title')}</th>
                <th className="px-4 py-3 font-medium">{t('adminNovels.table.author')}</th>
                <th className="px-4 py-3 font-medium">{t('adminNovels.table.status')}</th>
                <th className="px-4 py-3 font-medium">{t('adminNovels.table.featured')}</th>
                <th className="px-4 py-3 font-medium">{t('adminNovels.table.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {loading ? (
                <tr>
                  <td className="px-4 py-6 text-gray-600 dark:text-gray-300" colSpan={5}>{t('common.loading')}</td>
                </tr>
              ) : error ? (
                <tr>
                  <td className="px-4 py-6 text-red-600" colSpan={5}>{error}</td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-gray-600 dark:text-gray-300" colSpan={5}>{t('adminNovels.empty')}</td>
                </tr>
              ) : (
                items.map((n) => {
                  const id = n.id || n._id;
                  const author = n.author?.username || n.author?.email || n.author || '—';
                  const deleted = n.status === 'deleted';
                  return (
                    <tr key={id} className="text-gray-800 dark:text-gray-200">
                      <td className="px-4 py-3">
                        <div className="font-medium">{n.title || '—'}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{id}</div>
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{author}</td>
                      <td className="px-4 py-3">
                        <Badge tone={deleted ? 'red' : 'gray'}>{n.status || '—'}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        {n.isFeatured ? <Badge tone="indigo">{t('common.yes')}</Badge> : <Badge>{t('common.no')}</Badge>}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleFeature(id, !n.isFeatured)}
                            disabled={loading}
                          >
                            {n.isFeatured ? t('adminNovels.actions.unfeature') : t('adminNovels.actions.feature')}
                          </Button>
                          {deleted ? (
                            <Button size="sm" variant="outline" onClick={() => handleRestore(id)} disabled={loading}>{t('adminNovels.actions.restore')}</Button>
                          ) : (
                            <Button size="sm" variant="outline" onClick={() => handleDelete(id, false)} disabled={loading}>{t('adminNovels.actions.softDelete')}</Button>
                          )}
                          <Button size="sm" variant="danger" onClick={() => handleDelete(id, true)} disabled={loading}>{t('adminNovels.actions.hardDelete')}</Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800/60">
          <div className="text-xs text-gray-600 dark:text-gray-300">
            {pagination ? (
              <>{t('adminNovels.pagination.pageOf', { page: pagination.page, pages: pagination.pages })} • {t('adminNovels.pagination.total', { total: pagination.total })}</>
            ) : (
              <>{t('adminNovels.pagination.page', { page })}</>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled={loading || page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>{t('adminNovels.pagination.prev')}</Button>
            <Button
              variant="outline"
              size="sm"
              disabled={loading || (pagination ? page >= pagination.pages : items.length < limit)}
              onClick={() => setPage((p) => p + 1)}
            >
              {t('adminNovels.pagination.next')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNovelsPage;
