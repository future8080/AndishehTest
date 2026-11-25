import { useState } from 'react'
import { BadgeHelp, Bell, BriefcaseBusiness, ChartNoAxesCombined, ChevronDown, CircleDollarSign, FileText, LayoutDashboard, Settings, UsersRound } from 'lucide-react'
import { dashboardDefaults } from '../data/dashboard'
import { formatPersianNumber } from '../utils/format'

interface SidebarProps {
  activePage: string
  onNavigate: (page: string) => void
}

const navigation = [
  { label: 'داشبورد', icon: LayoutDashboard },
  { label: 'درخواست‌های وام', icon: CircleDollarSign, badge: dashboardDefaults.sidebarBadges.loanRequests },
  { label: 'کارمندان', icon: UsersRound },
  { label: 'سیاست‌های وام', icon: FileText },
  { label: 'گزارش‌ها', icon: ChartNoAxesCombined },
  { label: 'تنظیمات', icon: Settings },
]

export function Sidebar({ activePage, onNavigate }: SidebarProps) {
  const [managementOpen, setManagementOpen] = useState(true)

  return (
    <aside className="sidebar">
      <button className="brand" onClick={() => onNavigate('داشبورد')} aria-label="رفتن به داشبورد">
        <span className="brand-mark"><BriefcaseBusiness size={21} /></span>
        <span>همراه‌وام</span>
      </button>

      <div className="sidebar-label">منوی اصلی</div>
      <nav className="nav-list" aria-label="منوی اصلی">
        {navigation.map(({ label, icon: Icon, badge }) => (
          <button
            className={`nav-item ${activePage === label ? 'active' : ''}`}
            key={label}
            onClick={() => onNavigate(label)}
          >
            <Icon size={18} strokeWidth={1.8} />
            <span>{label}</span>
            {badge && <span className="nav-badge">{formatPersianNumber(badge)}</span>}
          </button>
        ))}
      </nav>

      <button className="management-toggle" onClick={() => setManagementOpen((open) => !open)}>
        <span>مدیریت</span>
        <ChevronDown size={16} className={managementOpen ? '' : 'rotated'} />
      </button>
      {managementOpen && (
        <nav className="nav-list management-list" aria-label="مدیریت">
          <button className={`nav-item ${activePage === 'صف بررسی' ? 'active' : ''}`} onClick={() => onNavigate('صف بررسی')}>
            <BriefcaseBusiness size={18} strokeWidth={1.8} /><span>صف بررسی</span><span className="nav-count">{formatPersianNumber(dashboardDefaults.sidebarBadges.pendingQueue)}</span>
          </button>
          <button className={`nav-item ${activePage === 'تاریخچه وام' ? 'active' : ''}`} onClick={() => onNavigate('تاریخچه وام')}>
            <FileText size={18} strokeWidth={1.8} /><span>تاریخچه وام</span>
          </button>
          <button className={`nav-item ${activePage === 'تحلیل‌ها' ? 'active' : ''}`} onClick={() => onNavigate('تحلیل‌ها')}>
            <ChartNoAxesCombined size={18} strokeWidth={1.8} /><span>تحلیل‌ها</span>
          </button>
          <button className={`nav-item ${activePage === 'اعلان‌ها' ? 'active' : ''}`} onClick={() => onNavigate('اعلان‌ها')}>
            <Bell size={18} strokeWidth={1.8} /><span>اعلان‌ها</span><span className="unread-dot" />
          </button>
          <button className={`nav-item ${activePage === 'راهنما' ? 'active' : ''}`} onClick={() => onNavigate('راهنما')}>
            <BadgeHelp size={18} strokeWidth={1.8} /><span>راهنما و پشتیبانی</span>
          </button>
        </nav>
      )}

      <div className="sidebar-bottom">
        <div className="help-card">
          <div className="help-icon"><BadgeHelp size={18} /></div>
          <div><strong>نیاز به راهنمایی دارید؟</strong><span>تیم پشتیبانی کنار شماست</span></div>
          <button onClick={() => onNavigate('راهنما')} aria-label="باز کردن راهنما">←</button>
        </div>
        <div className="sidebar-version">نسخه {dashboardDefaults.appVersion} <span>•</span> به‌روز</div>
      </div>
    </aside>
  )
}
