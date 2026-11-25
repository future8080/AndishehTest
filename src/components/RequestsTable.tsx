import { useState } from 'react'
import { ChevronDown, ChevronLeft, ChevronRight, Eye, MoreVertical, Pencil, Plus, Search, SlidersHorizontal, Trash2 } from 'lucide-react'
import { requestFormOptions } from '../data/requests'
import { allStatusesLabel, departmentLabels, loanTypeLabels, requestStatusLabels } from '../data/enumLabels'
import { formatPersianNumber } from '../utils/format'
import { useClickOutside } from '../hooks/useClickOutside'
import type { LoanRequest, RequestStatusFilter } from '../types'

interface RequestsTableProps {
  requests: LoanRequest[]
  search: string
  onSearch: (value: string) => void
  statusFilter: RequestStatusFilter
  onStatusFilter: (status: RequestStatusFilter) => void
  onCreate: () => void
  onView: (request: LoanRequest) => void
  onEdit: (request: LoanRequest) => void
  onDelete: (request: LoanRequest) => void
}

const pageSizeOptions = [5, 10, 20]
const statusFilterOptions = ['all', ...requestFormOptions.statuses] as const

export function RequestsTable({
  requests, search, onSearch, statusFilter, onStatusFilter, onCreate, onView, onEdit, onDelete,
}: RequestsTableProps) {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [actionMenuId, setActionMenuId] = useState<number | null>(null)
  const [expandedIds, setExpandedIds] = useState<number[]>([])
  const filterRef = useClickOutside<HTMLDivElement>(() => setFiltersOpen(false))
  const rowMenuRef = useClickOutside<HTMLDivElement>(() => setActionMenuId(null))
  const pageCount = Math.max(1, Math.ceil(requests.length / pageSize))
  const currentPage = Math.min(page, pageCount)
  const visible = requests.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  const allVisibleSelected = visible.length > 0 && visible.every((request) => selectedIds.includes(request.id))
  const firstPageNumber = Math.max(1, Math.min(currentPage - 2, pageCount - 4))
  const pageNumbers = Array.from({ length: Math.min(5, pageCount) }, (_, index) => firstPageNumber + index)

  function toggleAll() {
    setSelectedIds((ids) => allVisibleSelected
      ? ids.filter((id) => !visible.some((request) => request.id === id))
      : [...new Set([...ids, ...visible.map((request) => request.id)])])
  }

  function updateStatus(status: RequestStatusFilter) {
    onStatusFilter(status)
    setFiltersOpen(false)
  }

  return (
    <section className="requests-card">
      <div className="requests-heading">
        <div><h2>درخواست‌های وام</h2><p>مدیریت و پیگیری درخواست‌های ثبت‌شده</p></div>
        <button className="primary-button" onClick={onCreate}><Plus size={17} />ثبت درخواست جدید</button>
      </div>
      <div className="table-toolbar">
        <div className="toolbar-start">
          <div className="table-search"><Search size={17} /><input value={search} onChange={(event) => onSearch(event.target.value)} placeholder="جست‌وجو در درخواست‌ها..." /></div>
          <div className="filter-wrap" ref={filterRef}>
            <button className={`secondary-button ${statusFilter !== 'all' ? 'filter-active' : ''}`} onClick={() => setFiltersOpen((open) => !open)}>
              <SlidersHorizontal size={16} />فیلترها{statusFilter !== 'all' && <span className="filter-count">۱</span>}<ChevronDown size={14} />
            </button>
            {filtersOpen && (
              <div className="filter-menu">
                <strong>وضعیت درخواست</strong>
                {statusFilterOptions.map((status) => {
                  const label = status === 'all' ? allStatusesLabel : requestStatusLabels[status]
                  return (
                    <button className={statusFilter === status ? 'chosen' : ''} key={status} onClick={() => updateStatus(status)}>{label}</button>
                  )
                })}
              </div>
            )}
          </div>
        </div>
        <span className="results-count">{formatPersianNumber(requests.length)} درخواست</span>
      </div>

      {selectedIds.length > 0 && <div className="selection-bar">{formatPersianNumber(selectedIds.length)} مورد انتخاب شده <button onClick={() => setSelectedIds([])}>پاک‌کردن انتخاب</button></div>}
      <div className="table-scroll">
        <table>
          <thead><tr>
            <th className="checkbox-cell"><input type="checkbox" checked={allVisibleSelected} onChange={toggleAll} aria-label="انتخاب همه ردیف‌های صفحه" /></th>
            <th>کارمند</th><th>واحد سازمانی</th><th>نوع وام</th><th>مبلغ درخواستی</th><th>تاریخ ثبت</th><th>وضعیت</th><th>عملیات</th>
          </tr></thead>
          <tbody>
            {visible.map((request) => (
              <tr className={expandedIds.includes(request.id) ? 'row-expanded' : ''} key={request.id}>
                <td className="checkbox-cell"><input type="checkbox" checked={selectedIds.includes(request.id)} onChange={() => setSelectedIds((ids) => ids.includes(request.id) ? ids.filter((id) => id !== request.id) : [...ids, request.id])} aria-label={`انتخاب درخواست ${request.employee}`} /></td>
                <td className="employee-column"><div className="employee-cell"><span className={`avatar employee-avatar avatar-${request.id % 5}`}>{request.initials}</span><span className="employee-details"><span className="employee-name">{request.employee}</span><small>{departmentLabels[request.department]}</small></span><input className="mobile-checkbox" type="checkbox" checked={selectedIds.includes(request.id)} onChange={() => setSelectedIds((ids) => ids.includes(request.id) ? ids.filter((id) => id !== request.id) : [...ids, request.id])} aria-label={`انتخاب درخواست ${request.employee}`} /><button className="mobile-expand" aria-label={`${expandedIds.includes(request.id) ? 'بستن' : 'نمایش'} جزئیات ${request.employee}`} aria-expanded={expandedIds.includes(request.id)} onClick={() => setExpandedIds((ids) => ids.includes(request.id) ? ids.filter((id) => id !== request.id) : [...ids, request.id])}><ChevronDown size={17} /></button></div></td>
                <td className="department-cell" data-label="واحد سازمانی">{departmentLabels[request.department]}</td>
                <td className="loan-type-cell" data-label="نوع وام">{loanTypeLabels[request.type]}</td>
                <td className="amount-cell" data-label="مبلغ درخواستی">{formatPersianNumber(request.amount)} <small>تومان</small></td>
                <td className="date-cell" data-label="تاریخ ثبت">{request.date}</td>
                <td className="status-cell" data-label="وضعیت"><span className={`status-badge ${request.status}`}><i />{requestStatusLabels[request.status]}</span></td>
                <td className="actions-column" data-label="عملیات">
                  <div className="row-actions">
                    <button className="row-action" aria-label={`مشاهده ${request.employee}`} onClick={() => onView(request)}><Eye size={16} /></button>
                    <button className="row-action" aria-label={`ویرایش ${request.employee}`} onClick={() => onEdit(request)}><Pencil size={15} /></button>
                    <div className="row-menu-wrap" ref={actionMenuId === request.id ? rowMenuRef : undefined}>
                      <button className="row-action" aria-label={`عملیات بیشتر ${request.employee}`} onClick={() => setActionMenuId(actionMenuId === request.id ? null : request.id)}><MoreVertical size={17} /></button>
                      {actionMenuId === request.id && <div className="row-menu"><button onClick={() => { onView(request); setActionMenuId(null) }}><Eye size={14} />جزئیات</button><button onClick={() => { onEdit(request); setActionMenuId(null) }}><Pencil size={14} />ویرایش</button><button className="danger-action" onClick={() => { onDelete(request); setActionMenuId(null) }}><Trash2 size={14} />حذف</button></div>}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
            {visible.length === 0 && <tr className="empty-row"><td className="empty-state" colSpan={8}><Search size={24} /><strong>درخواستی پیدا نشد</strong><span>عبارت جست‌وجو یا فیلترها را تغییر دهید.</span></td></tr>}
          </tbody>
        </table>
      </div>
      <footer className="table-footer">
        <div className="page-size"><span>نمایش</span><select value={pageSize} onChange={(event) => { setPageSize(Number(event.target.value)); setPage(1) }}>{pageSizeOptions.map((size) => <option value={size} key={size}>{size}</option>)}</select><span>ردیف در هر صفحه</span></div>
        <div className="pagination">
          <span>{requests.length ? `${formatPersianNumber((currentPage - 1) * pageSize + 1)}–${formatPersianNumber(Math.min(currentPage * pageSize, requests.length))} از ${formatPersianNumber(requests.length)}` : '۰ مورد'}</span>
          <button className="page-arrow" aria-label="صفحه بعد" disabled={currentPage >= pageCount} onClick={() => setPage((current) => Math.min(pageCount, current + 1))}><ChevronRight size={17} /></button>
          {pageNumbers.map((pageNumber) => <button className={`page-number ${pageNumber === currentPage ? 'current' : ''}`} key={pageNumber} onClick={() => setPage(pageNumber)}>{formatPersianNumber(pageNumber)}</button>)}
          <button className="page-arrow" aria-label="صفحه قبل" disabled={currentPage <= 1} onClick={() => setPage((current) => Math.max(1, Math.min(pageCount, current) - 1))}><ChevronLeft size={17} /></button>
        </div>
      </footer>
    </section>
  )
}
