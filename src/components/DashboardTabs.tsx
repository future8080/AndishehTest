import { ChartNoAxesCombined, ClipboardList, LayoutDashboard } from 'lucide-react'
import type { DashboardTab } from '../types'
import { formatPersianNumber } from '../utils/format'

interface DashboardTabsProps {
  activeTab: DashboardTab
  requestCount: number
  onChange: (tab: DashboardTab) => void
}

const tabs: { id: DashboardTab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'stats', label: 'آمار', icon: LayoutDashboard },
  { id: 'charts', label: 'نمودارها', icon: ChartNoAxesCombined },
  { id: 'requests', label: 'درخواست‌ها', icon: ClipboardList },
]

export function DashboardTabs({ activeTab, requestCount, onChange }: DashboardTabsProps) {
  return (
    <nav className="dashboard-tabs" aria-label="بخش‌های داشبورد">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button className={`dashboard-tab ${activeTab === id ? 'selected' : ''}`} key={id} onClick={() => onChange(id)} aria-current={activeTab === id ? 'page' : undefined}>
          <Icon size={16} />
          <span>{label}</span>
          {id === 'requests' && <span className="tab-count">{formatPersianNumber(requestCount)}</span>}
        </button>
      ))}
    </nav>
  )
}
