import { useState } from 'react'
import { ChevronDown, MoreHorizontal } from 'lucide-react'
import { chartFilterOptions, departmentData, statusData, trendData } from '../data/charts'
import { allDepartmentsLabel, chartPeriodLabels, departmentLabels, requestStatusLabels } from '../data/enumLabels'
import { useClickOutside } from '../hooks/useClickOutside'
import { ChartPeriod, RequestStatus } from '../types'
import type { DepartmentFilter } from '../types'
import { formatPersianNumber } from '../utils/format'
import {
  Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from 'recharts'

export function ChartsPanel() {
  const [period, setPeriod] = useState<ChartPeriod>(chartFilterOptions.defaults.period)
  const [showPeriod, setShowPeriod] = useState(false)
  const [department, setDepartment] = useState<DepartmentFilter>(chartFilterOptions.defaults.department)
  const [showDepartment, setShowDepartment] = useState(false)
  const [chartMenu, setChartMenu] = useState(false)
  const [statusMenu, setStatusMenu] = useState(false)
  const periodRef = useClickOutside<HTMLDivElement>(() => setShowPeriod(false))
  const departmentRef = useClickOutside<HTMLDivElement>(() => setShowDepartment(false))
  const chartMenuRef = useClickOutside<HTMLDivElement>(() => setChartMenu(false))
  const statusMenuRef = useClickOutside<HTMLDivElement>(() => setStatusMenu(false))
  const visibleTrendData = period === ChartPeriod.Weekly
    ? trendData.map((item, index) => ({ ...item, month: `هفته ${chartFilterOptions.weekLabels[index]}` }))
    : period === ChartPeriod.Yearly
      ? trendData.map((item, index) => ({ ...item, month: chartFilterOptions.yearLabels[index] }))
      : trendData
  const visibleDepartmentData = department === 'all'
    ? departmentData
    : departmentData.filter((item) => item.department === department)
  const totalRequests = statusData.reduce((sum, item) => sum + item.value, 0)

  return (
    <section className="charts-grid" aria-label="نمودارهای درخواست وام">
      <article className="chart-card trend-card">
        <div className="card-heading">
          <div><h2>روند درخواست‌ها</h2><p>مقایسه درخواست‌های ثبت‌شده در بازه زمانی</p></div>
          <div className="select-wrap" ref={periodRef}>
            <button className="select-button" onClick={() => setShowPeriod((show) => !show)}>{chartPeriodLabels[period]}<ChevronDown size={15} /></button>
            {showPeriod && <div className="select-menu">{chartFilterOptions.periods.map((item) => <button key={item} onClick={() => { setPeriod(item); setShowPeriod(false) }}>{chartPeriodLabels[item]}</button>)}</div>}
          </div>
        </div>
        <div className="chart-legend"><span><i className="legend-dot blue-dot" />این دوره</span><span><i className="legend-dot light-blue-dot" />دوره قبل</span></div>
        <div className="line-chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={visibleTrendData} margin={{ top: 10, right: 3, left: -18, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 5" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#8b94a5', fontSize: 11 }} dy={8} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8b94a5', fontSize: 10 }} ticks={[0, 25, 50, 75, 100]} />
              <Tooltip contentStyle={{ direction: 'rtl', border: '1px solid var(--border)', borderRadius: 10, backgroundColor: 'var(--surface)', color: 'var(--text)', fontFamily: 'inherit', fontSize: 12 }} />
              <Line type="monotone" dataKey="previous" name="دوره قبل" stroke="#b8d9f8" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="current" name="این دوره" stroke="#4285f4" strokeWidth={2.5} dot={{ r: 3, fill: '#4285f4', strokeWidth: 0 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </article>

      <article className="chart-card department-card">
        <div className="card-heading">
          <div><h2>درخواست‌ها بر اساس واحد</h2><p>تفکیک وضعیت درخواست‌های سازمان</p></div>
          <div className="chart-heading-actions">
            <div className="select-wrap" ref={departmentRef}>
              <button className="select-button" onClick={() => setShowDepartment((show) => !show)}>{department === 'all' ? allDepartmentsLabel : `واحد ${departmentLabels[department]}`}<ChevronDown size={15} /></button>
              {showDepartment && <div className="select-menu">{chartFilterOptions.departments.map((item) => <button key={item} onClick={() => { setDepartment(item); setShowDepartment(false) }}>{item === 'all' ? allDepartmentsLabel : `واحد ${departmentLabels[item]}`}</button>)}</div>}
            </div>
            <div className="select-wrap" ref={chartMenuRef}>
              <button className="icon-button chart-more" onClick={() => setChartMenu((show) => !show)} aria-label="گزینه‌های نمودار"><MoreHorizontal size={19} /></button>
              {chartMenu && <div className="select-menu"><button onClick={() => window.print()}>چاپ نمودار</button><button onClick={() => setChartMenu(false)}>بستن منو</button></div>}
            </div>
          </div>
        </div>
        <div className="chart-legend"><span><i className="legend-dot blue-dot" />{requestStatusLabels[RequestStatus.Approved]}</span><span><i className="legend-dot green-dot" />{requestStatusLabels[RequestStatus.Pending]}</span></div>
        <div className="bar-chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={visibleDepartmentData} margin={{ top: 10, right: 0, left: -18, bottom: 0 }} barGap={5}>
              <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 5" />
              <XAxis dataKey="department" tickFormatter={(value: string) => departmentLabels[value as keyof typeof departmentLabels]} axisLine={false} tickLine={false} tick={{ fill: '#8b94a5', fontSize: 10 }} dy={7} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8b94a5', fontSize: 10 }} ticks={[0, 25, 50, 75, 100]} />
              <Tooltip labelFormatter={(value) => departmentLabels[value as keyof typeof departmentLabels]} contentStyle={{ direction: 'rtl', border: '1px solid var(--border)', borderRadius: 10, backgroundColor: 'var(--surface)', color: 'var(--text)', fontFamily: 'inherit', fontSize: 12 }} />
              <Bar dataKey="approved" name={requestStatusLabels[RequestStatus.Approved]} fill="#6baaf4" radius={[4, 4, 0, 0]} maxBarSize={18} />
              <Bar dataKey="pending" name={requestStatusLabels[RequestStatus.Pending]} fill="#8bdcc2" radius={[4, 4, 0, 0]} maxBarSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </article>

      <article className="chart-card status-card">
        <div className="card-heading"><div><h2>وضعیت درخواست‌ها</h2><p>نمای کلی وضعیت پرونده‌ها</p></div><div className="select-wrap" ref={statusMenuRef}><button className="icon-button chart-more" aria-label="گزینه‌های وضعیت" onClick={() => setStatusMenu((show) => !show)}><MoreHorizontal size={19} /></button>{statusMenu && <div className="select-menu"><button onClick={() => window.print()}>چاپ گزارش وضعیت</button><button onClick={() => setStatusMenu(false)}>بستن منو</button></div>}</div></div>
        <div className="status-chart-body">
          <div className="donut-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="status" innerRadius="66%" outerRadius="91%" paddingAngle={3} stroke="none">
                  {statusData.map((item) => <Cell key={item.status} fill={item.color} />)}
                </Pie>
                <Tooltip formatter={(value, name) => [value, requestStatusLabels[name as RequestStatus]]} contentStyle={{ direction: 'rtl', border: '1px solid var(--border)', borderRadius: 10, backgroundColor: 'var(--surface)', color: 'var(--text)', fontFamily: 'inherit', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="donut-center"><strong>{formatPersianNumber(totalRequests)}</strong><span>درخواست</span></div>
          </div>
          <div className="status-legend">{statusData.map((item) => <div className="status-legend-row" key={item.status}><span><i style={{ background: item.color }} />{requestStatusLabels[item.status]}</span><strong>{formatPersianNumber(item.value)}</strong></div>)}</div>
        </div>
      </article>
    </section>
  )
}
