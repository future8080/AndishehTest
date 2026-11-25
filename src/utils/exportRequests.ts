import { departmentLabels, loanTypeLabels, requestStatusLabels } from '../data/enumLabels'
import type { LoanRequest } from '../types'

export function downloadRequestsCsv(requests: LoanRequest[]) {
  const rows = [
    ['نام کارمند', 'واحد سازمانی', 'نوع وام', 'مبلغ (تومان)', 'تاریخ ثبت', 'وضعیت'],
    ...requests.map((request) => [
      request.employee,
      departmentLabels[request.department],
      loanTypeLabels[request.type],
      String(request.amount),
      request.date,
      requestStatusLabels[request.status],
    ]),
  ]
  const csv = `\uFEFF${rows.map((row) => row.map((field) => `"${field.replaceAll('"', '""')}"`).join(',')).join('\r\n')}`
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = 'gozaresh-darkhast-vam.csv'
  link.click()
  URL.revokeObjectURL(url)
}
