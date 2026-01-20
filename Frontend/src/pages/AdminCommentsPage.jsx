import React, { useEffect, useMemo, useState } from 'react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import AdminCommentService from '../services/admin.comment.service';
import { useLanguage } from '../context/LanguageContext';

const AdminCommentsPage = () => {
  const { t } = useLanguage();

  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [search, setSearch] = useState('');
  const [novelId, setNovelId] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [isDeleted, setIsDeleted] = useState('');

  const params = useMemo(
    () => ({
      page,
      limit,
      search: search || undefined,
      novelId: novelId || undefined,
      authorId: authorId || undefined,
      isDeleted: isDeleted === '' ? undefined : isDeleted
    }),
    [page, limit, search, novelId, authorId, isDeleted]
  );

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await AdminCommentService.getComments(params);
      const result = res?.data;
      const list = result?.data;
      setItems(Array.isArray(list) ? list : []);
      setPagination(result?.pagination || null);
    } catch (e) {
      setError(e?.response?.data?.message || t('adminComments.errors.loadFailed'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [params]);

  const handleDelete = async (id, hard) => {
    if (!window.confirm(hard ? t('adminComments.confirms.hardDeleteComment') : t('adminComments.confirms.softDeleteComment'))) return;
    try {
      setLoading(true);
      await AdminCommentService.deleteComment(id, hard);
      await load();
    } catch (e) {
      alert(e?.response?.data?.message || t('adminComments.errors.deleteFailed'));
      setLoading(false);
    }
  };

  const handleRestore = async (id) => {
    if (!window.confirm(t('adminComments.confirms.restoreComment'))) return;
    try {
      setLoading(true);
      await AdminCommentService.restoreComment(id);
      await load();
    } catch (e) {
      alert(e?.response?.data?.message || t('adminComments.errors.restoreFailed'));
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5">
        <div className="flex flex-col md:flex-row md:items-end gap-3">
          <div className="flex-1">
            <div className="text-lg font-semibold text-gray-900 dark:text-white">{t('adminComments.title')}</div>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-5 gap-3">
              <div className="md:col-span-2">
                <div className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">{t('adminComments.filters.search')}</div>
                <input
                  value={search}
                  onChange={(e) => {
                    setPage(1);
                    setSearch(e.target.value);
                  }}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder={t('adminComments.placeholders.search')}
                />
              </div>
              <div>
                <div className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">{t('adminComments.filters.novelId')}</div>
                <input
                  value={novelId}
                  onChange={(e) => {
                    setPage(1);
                    setNovelId(e.target.value);
                  }}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder={t('adminComments.placeholders.novelId')}
                />
              </div>
              <div>
                <div className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">{t('adminComments.filters.authorId')}</div>
                <input
                  value={authorId}
                  onChange={(e) => {
                    setPage(1);
                    setAuthorId(e.target.value);
                  }}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder={t('adminComments.placeholders.authorId')}
                />
              </div>
              <div>
                <div className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">{t('adminComments.filters.deleted')}</div>
                <select
                  value={isDeleted}
                  onChange={(e) => {
                    setPage(1);
                    setIsDeleted(e.target.value);
                  }}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                >
                  <option value="">{t('adminComments.options.all')}</option>
                  <option value="true">{t('adminComments.options.deleted')}</option>
                  <option value="false">{t('adminComments.options.notDeleted')}</option>
                </select>
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
            <Button variant="outline" onClick={load} disabled={loading}>{t('adminComments.actions.refresh')}</Button>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800/60">
              <tr className="text-left text-gray-600 dark:text-gray-300">
                <th className="px-4 py-3 font-medium">{t('adminComments.table.content')}</th>
                <th className="px-4 py-3 font-medium">{t('adminComments.table.author')}</th>
                <th className="px-4 py-3 font-medium">{t('adminComments.table.novel')}</th>
                <th className="px-4 py-3 font-medium">{t('adminComments.table.deleted')}</th>
                <th className="px-4 py-3 font-medium">{t('adminComments.table.actions')}</th>
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
                  <td className="px-4 py-6 text-gray-600 dark:text-gray-300" colSpan={5}>{t('adminComments.empty')}</td>
                </tr>
              ) : (
                items.map((c) => {
                  const id = c.id || c._id;
                  const author = c.author?.username || c.author?.email || c.author || c.authorId || '—';
                  const novel = c.novelId?.title || c.novelId || c.novel || '—';
                  const deleted = !!c.isDeleted;
                  return (
                    <tr key={id} className="text-gray-800 dark:text-gray-200">
                      <td className="px-4 py-3">
                        <div className="font-medium truncate max-w-[520px]">{c.content || '—'}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{id}</div>
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{author}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{novel}</td>
                      <td className="px-4 py-3">
                        {deleted ? <Badge tone="red">{t('common.yes')}</Badge> : <Badge tone="green">{t('common.no')}</Badge>}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          {deleted ? (
                            <Button size="sm" variant="outline" onClick={() => handleRestore(id)} disabled={loading}>{t('adminComments.actions.restore')}</Button>
                          ) : (
                            <Button size="sm" variant="outline" onClick={() => handleDelete(id, false)} disabled={loading}>{t('adminComments.actions.softDelete')}</Button>
                          )}
                          <Button size="sm" variant="danger" onClick={() => handleDelete(id, true)} disabled={loading}>{t('adminComments.actions.hardDelete')}</Button>
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
              <>{t('adminComments.pagination.pageOf', { page: pagination.page, pages: pagination.pages })} • {t('adminComments.pagination.total', { total: pagination.total })}</>
            ) : (
              <>{t('adminComments.pagination.page', { page })}</>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled={loading || page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>{t('adminComments.pagination.prev')}</Button>
            <Button
              variant="outline"
              size="sm"
              disabled={loading || (pagination ? page >= pagination.pages : items.length < limit)}
              onClick={() => setPage((p) => p + 1)}
            >
              {t('adminComments.pagination.next')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCommentsPage;
