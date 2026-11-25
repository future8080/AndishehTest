import { ChartNoAxesCombined, CircleDollarSign } from 'lucide-react'
import { requestStatusLabels } from '../data/enumLabels'
import { RequestStatus } from '../types'
import type { LoanRequest } from '../types'
import { formatPersianNumber } from '../utils/format'

interface StatsOverviewProps {
  requests: LoanRequest[]
}

const statuses = [
  RequestStatus.Approved,
  RequestStatus.Pending,
  RequestStatus.Rejected,
  RequestStatus.Cancelled,
]

export function StatsOverview({ requests }: StatsOverviewProps) {
  const totalAmount = requests.reduce((sum, request) => sum + request.amount, 0)

  return (
    <section className="stats-overview">
      <header className="stats-overview-heading">
        <div className="overview-icon"><ChartNoAxesCombined size={18} /></div>
        <div><h2>خلاصه وضعیت درخواست‌ها</h2><p>توزیع درخواست‌ها بر اساس آخرین وضعیت</p></div>
      </header>
      <div className="overview-total">
        <span><CircleDollarSign size={16} /> مجموع مبلغ درخواست‌ها</span>
        <strong>{formatPersianNumber(totalAmount)} <small>تومان</small></strong>
      </div>
      <div className="overview-status-list">
        {statuses.map((status) => {
          const count = requests.filter((request) => request.status === status).length
          const percent = requests.length ? Math.round((count / requests.length) * 100) : 0
          return (
            <div className={`overview-status ${status}`} key={status}>
              <div className="overview-status-label"><span><i />{requestStatusLabels[status]}</span><strong>{formatPersianNumber(count)} <small>درخواست</small></strong></div>
              <div className="overview-progress"><span style={{ width: `${percent}%` }} /></div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
