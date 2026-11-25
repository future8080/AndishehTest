import { ArrowDownLeft, ArrowUpLeft, Check, Clock3, CircleDollarSign, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { requestStatusLabels } from '../data/enumLabels'
import { dashboardDefaults } from '../data/dashboard'
import { RequestStatus } from '../types'
import type { LoanRequest } from '../types'
import { formatPersianNumber } from '../utils/format'

interface StatsCardsProps {
  requests: LoanRequest[]
}

type StatKey = keyof typeof dashboardDefaults.statChanges

export function StatsCards({ requests }: StatsCardsProps) {
  const approved = requests.filter((request) => request.status === RequestStatus.Approved).length
  const pending = requests.filter((request) => request.status === RequestStatus.Pending).length
  const rejected = requests.filter((request) => request.status === RequestStatus.Rejected).length
  const cards: { key: StatKey; title: string; value: number; icon: LucideIcon; tone: string }[] = [
    { key: 'total', title: 'کل درخواست‌ها', value: requests.length, icon: CircleDollarSign, tone: 'blue' },
    { key: 'approved', title: `درخواست‌های ${requestStatusLabels[RequestStatus.Approved]}`, value: approved, icon: Check, tone: 'green' },
    { key: 'pending', title: `${requestStatusLabels[RequestStatus.Pending]} بررسی`, value: pending, icon: Clock3, tone: 'amber' },
    { key: 'rejected', title: `درخواست‌های ${requestStatusLabels[RequestStatus.Rejected]}`, value: rejected, icon: X, tone: 'purple' },
  ]

  return (
    <section className="stats-grid" aria-label="خلاصه درخواست‌ها">
      {cards.map(({ key, title, value, icon: Icon, tone }) => {
        const change = dashboardDefaults.statChanges[key]
        return (
          <article className={`stat-card ${tone}`} key={title}>
            <div className="stat-top"><span>{title}</span><span className="stat-icon"><Icon size={19} /></span></div>
            <strong className="stat-value">{formatPersianNumber(value)}</strong>
            <div className="stat-foot"><span className={`stat-change ${change.direction}`} >{change.direction === 'up' ? <ArrowUpLeft size={14} /> : <ArrowDownLeft size={14} />}{change.change}</span><span>{change.note}</span></div>
          </article>
        )
      })}
    </section>
  )
}
