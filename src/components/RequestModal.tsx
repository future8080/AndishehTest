import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { defaultRequestFormValues, requestFormOptions } from '../data/requests'
import { departmentLabels, loanTypeLabels, requestStatusLabels } from '../data/enumLabels'
import { Department, LoanType, RequestStatus } from '../types'
import type { LoanRequest, RequestFormValues } from '../types'

interface RequestModalProps {
  mode: 'create' | 'edit' | 'view'
  request?: LoanRequest
  onClose: () => void
  onSave: (values: RequestFormValues) => void
}

export function RequestModal({ mode, request, onClose, onSave }: RequestModalProps) {
  const [values, setValues] = useState<RequestFormValues>(request ? {
    employee: request.employee, department: request.department, type: request.type,
    amount: request.amount, date: request.date, status: request.status,
  } : defaultRequestFormValues)
  const readOnly = mode === 'view'

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  function update<K extends keyof RequestFormValues>(key: K, value: RequestFormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }))
  }

  const title = mode === 'create' ? 'ثبت درخواست وام جدید' : mode === 'edit' ? 'ویرایش درخواست وام' : 'جزئیات درخواست وام'
  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="request-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <header className="modal-header"><div><h2 id="modal-title">{title}</h2><p>{readOnly ? 'اطلاعات ثبت‌شده برای این درخواست' : 'اطلاعات درخواست را وارد کنید'}</p></div><button className="icon-button" onClick={onClose} aria-label="بستن"><X size={20} /></button></header>
        <form onSubmit={(event) => { event.preventDefault(); if (!readOnly) onSave(values) }}>
          <div className="form-grid">
            <label>نام و نام خانوادگی<input autoFocus={!readOnly} required disabled={readOnly} value={values.employee} onChange={(event) => update('employee', event.target.value)} placeholder={requestFormOptions.placeholders.employee} /></label>
            <label>واحد سازمانی<select disabled={readOnly} value={values.department} onChange={(event) => update('department', event.target.value as Department)}>{requestFormOptions.departments.map((value) => <option value={value} key={value}>{departmentLabels[value]}</option>)}</select></label>
            <label>نوع وام<select disabled={readOnly} value={values.type} onChange={(event) => update('type', event.target.value as LoanType)}>{requestFormOptions.loanTypes.map((value) => <option value={value} key={value}>{loanTypeLabels[value]}</option>)}</select></label>
            <label>مبلغ درخواستی (تومان)<input required type="number" min={1000000} step={1000000} disabled={readOnly} value={values.amount || ''} onChange={(event) => update('amount', Number(event.target.value))} placeholder={requestFormOptions.placeholders.amount} /></label>
            <label>تاریخ ثبت<input required disabled={readOnly} value={values.date} onChange={(event) => update('date', event.target.value)} /></label>
            <label>وضعیت درخواست<select disabled={readOnly} value={values.status} onChange={(event) => update('status', event.target.value as RequestStatus)}>{requestFormOptions.statuses.map((value) => <option value={value} key={value}>{requestStatusLabels[value]}</option>)}</select></label>
          </div>
          <footer className="modal-actions">{readOnly ? <button type="button" className="secondary-button" onClick={onClose}>بستن</button> : <><button type="button" className="secondary-button" onClick={onClose}>انصراف</button><button type="submit" className="primary-button">{mode === 'create' ? 'ثبت درخواست' : 'ذخیره تغییرات'}</button></>}</footer>
        </form>
      </section>
    </div>
  )
}
