import { ChartNoAxesColumnIncreasing, ClipboardList, House, Settings } from 'lucide-react'
import type { DashboardTab } from '../types'

interface MobileTabBarProps {
  activeTab: DashboardTab
  onNavigate: (tab: DashboardTab) => void
  onSettings: () => void
}

const items = [
  { label: 'خانه', icon: House, tab: 'stats' as const },
  { label: 'آمار', icon: ChartNoAxesColumnIncreasing, tab: 'charts' as const },
  { label: 'درخواست‌ها', icon: ClipboardList, tab: 'requests' as const },
]

export function MobileTabBar({ activeTab, onNavigate, onSettings }: MobileTabBarProps) {
  return (
    <nav className="mobile-tab-bar" aria-label="ناوبری موبایل">
      {items.map(({ label, icon: Icon, tab }) => (
        <button className={`mobile-tab-item ${activeTab === tab ? 'active' : ''}`} key={tab} onClick={() => onNavigate(tab)} aria-current={activeTab === tab ? 'page' : undefined}>
          <Icon size={21} strokeWidth={activeTab === tab ? 2.4 : 1.9} />
          <span>{label}</span>
        </button>
      ))}
      <button className="mobile-tab-item" onClick={onSettings}>
        <Settings size={21} strokeWidth={1.9} />
        <span>تنظیمات</span>
      </button>
    </nav>
  )
}
