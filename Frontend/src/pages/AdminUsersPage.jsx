import React, { useEffect, useMemo, useState } from 'react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import AdminUserService from '../services/admin.user.service';
import { useLanguage } from '../context/LanguageContext';

const AdminUsersPage = () => {
  const { t } = useLanguage();

  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [role, setRole] = useState('');
  const [includeDeleted, setIncludeDeleted] = useState(false);

  const params = useMemo(
    () => ({
      page,
      limit,
      search: search || undefined,
      status: status || undefined,
      role: role || undefined,
      includeDeleted: includeDeleted ? 'true' : 'false'
    }),
    [page, limit, search, status, role, includeDeleted]
  );

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await AdminUserService.getUsers(params);
      const result = res?.data;
      const list = result?.data;
      setItems(Array.isArray(list) ? list : []);
      setPagination(result?.pagination || null);
    } catch (e) {
      setError(e?.response?.data?.message || t('adminUsers.errors.loadFailed'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [params]);

  const handleUpdate = async (userId, partial) => {
    try {
      setLoading(true);
      await AdminUserService.updateUser(userId, partial);
      await load();
    } catch (e) {
      alert(e?.response?.data?.message || t('adminUsers.errors.updateFailed'));
      setLoading(false);
    }
  };

  const handleBlock = async (userId, block) => {
    if (!window.confirm(block ? t('adminUsers.confirms.blockUser') : t('adminUsers.confirms.unblockUser'))) return;
    try {
      setLoading(true);
      await AdminUserService.blockUser(userId, block);
      await load();
    } catch (e) {
      alert(e?.response?.data?.message || t('adminUsers.errors.actionFailed'));
      setLoading(false);
    }
  };

  const handleDelete = async (userId, hard) => {
    if (!window.confirm(hard ? t('adminUsers.confirms.hardDeleteUser') : t('adminUsers.confirms.softDeleteUser'))) return;
    try {
      setLoading(true);
      await AdminUserService.deleteUser(userId, hard);
      await load();
    } catch (e) {
      alert(e?.response?.data?.message || t('adminUsers.errors.deleteFailed'));
      setLoading(false);
    }
  };

  const handleRestore = async (userId) => {
    if (!window.confirm(t('adminUsers.confirms.restoreUser'))) return;
    try {
      setLoading(true);
      await AdminUserService.restoreUser(userId);
      await load();
    } catch (e) {
      alert(e?.response?.data?.message || t('adminUsers.errors.restoreFailed'));
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5">
        <div className="flex flex-col md:flex-row md:items-end gap-3">
          <div className="flex-1">
            <div className="text-lg font-semibold text-gray-900 dark:text-white">{t('adminUsers.title')}</div>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-4 gap-3">
              <div>
                <div className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">{t('adminUsers.filters.search')}</div>
                <input
                  value={search}
                  onChange={(e) => {
                    setPage(1);
                    setSearch(e.target.value);
                  }}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder={t('adminUsers.placeholders.search')}
                />
              </div>
              <div>
                <div className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">{t('adminUsers.filters.status')}</div>
                <select
                  value={status}
                  onChange={(e) => {
                    setPage(1);
                    setStatus(e.target.value);
                  }}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                >
                  <option value="">{t('adminUsers.options.all')}</option>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="BLOCKED">BLOCKED</option>
                  <option value="DELETED">DELETED</option>
                </select>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">{t('adminUsers.filters.role')}</div>
                <select
                  value={role}
                  onChange={(e) => {
                    setPage(1);
                    setRole(e.target.value);
                  }}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                >
                  <option value="">{t('adminUsers.options.all')}</option>
                  <option value="USER">USER</option>
                  <option value="AUTHOR">AUTHOR</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>
              <div className="flex items-center gap-2 pt-5 md:pt-0">
                <input
                  id="includeDeleted"
                  type="checkbox"
                  checked={includeDeleted}
                  onChange={(e) => {
                    setPage(1);
                    setIncludeDeleted(e.target.checked);
                  }}
                />
                <label htmlFor="includeDeleted" className="text-sm text-gray-700 dark:text-gray-300">{t('adminUsers.filters.includeDeleted')}</label>
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
            <Button variant="outline" onClick={load} disabled={loading}>{t('adminUsers.actions.refresh')}</Button>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800/60">
              <tr className="text-left text-gray-600 dark:text-gray-300">
                <th className="px-4 py-3 font-medium">{t('adminUsers.table.user')}</th>
                <th className="px-4 py-3 font-medium">{t('adminUsers.table.role')}</th>
                <th className="px-4 py-3 font-medium">{t('adminUsers.table.status')}</th>
                <th className="px-4 py-3 font-medium">{t('adminUsers.table.created')}</th>
                <th className="px-4 py-3 font-medium">{t('adminUsers.table.actions')}</th>
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
                  <td className="px-4 py-6 text-gray-600 dark:text-gray-300" colSpan={5}>{t('adminUsers.empty')}</td>
                </tr>
              ) : (
                items.map((u) => {
                  const id = u.id || u._id;
                  const statusValue = (u.status || '').toString();
                  const statusTone =
                    statusValue === 'ACTIVE'
                      ? 'green'
                      : statusValue === 'BLOCKED'
                        ? 'amber'
                        : statusValue === 'DELETED'
                          ? 'red'
                          : 'gray';
                  return (
                    <tr key={id} className="text-gray-800 dark:text-gray-200">
                      <td className="px-4 py-3">
                        <div className="font-medium">{u.username || '—'}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{u.email || '—'}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <select
                            value={u.role || ''}
                            onChange={(e) => handleUpdate(id, { role: e.target.value })}
                            className="rounded-md border border-gray-300 px-2 py-1 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            disabled={loading}
                          >
                            <option value="USER">USER</option>
                            <option value="AUTHOR">AUTHOR</option>
                            <option value="ADMIN">ADMIN</option>
                          </select>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge tone={statusTone}>{statusValue || '—'}</Badge>
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                        {u.createdAt ? new Date(u.createdAt).toLocaleString() : '—'}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          {u.status === 'DELETED' ? (
                            <Button size="sm" variant="outline" onClick={() => handleRestore(id)} disabled={loading}>{t('adminUsers.actions.restore')}</Button>
                          ) : (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleBlock(id, u.status !== 'BLOCKED')}
                                disabled={loading}
                              >
                                {u.status === 'BLOCKED' ? t('adminUsers.actions.unblock') : t('adminUsers.actions.block')}
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleDelete(id, false)} disabled={loading}>{t('adminUsers.actions.softDelete')}</Button>
                            </>
                          )}
                          <Button size="sm" variant="danger" onClick={() => handleDelete(id, true)} disabled={loading}>{t('adminUsers.actions.hardDelete')}</Button>
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
              <>{t('adminUsers.pagination.pageOf', { page: pagination.page, pages: pagination.pages })} • {t('adminUsers.pagination.total', { total: pagination.total })}</>
            ) : (
              <>{t('adminUsers.pagination.page', { page })}</>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled={loading || page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>{t('adminUsers.pagination.prev')}</Button>
            <Button
              variant="outline"
              size="sm"
              disabled={loading || (pagination ? page >= pagination.pages : items.length < limit)}
              onClick={() => setPage((p) => p + 1)}
            >
              {t('adminUsers.pagination.next')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersPage;
