import { departmentLabels, loanTypeLabels, requestStatusLabels } from '../data/enumLabels'
import type { LoanRequest, RequestStatusFilter } from '../types'

interface RequestFilters {
  range: string
  search: string
  status: RequestStatusFilter
}

export function filterLoanRequests(requests: LoanRequest[], filters: RequestFilters) {
  const query = filters.search.trim().toLocaleLowerCase('fa')

  return requests.filter((request) => {
    const matchesStatus = filters.status === 'all' || request.status === filters.status
    const matchesRange = filters.range === 'سه‌ماهه اخیر'
      || (filters.range.includes('اردیبهشت') && request.date.includes('/۰۲/'))
      || (filters.range.includes('فروردین') && request.date.includes('/۰۱/'))
    const matchesSearch = !query || [
      request.employee,
      departmentLabels[request.department],
      loanTypeLabels[request.type],
      request.date,
      requestStatusLabels[request.status],
      request.department,
      request.type,
      request.status,
    ]
      .some((value) => value.toLocaleLowerCase('fa').includes(query))

    return matchesStatus && matchesRange && matchesSearch
  })
}
