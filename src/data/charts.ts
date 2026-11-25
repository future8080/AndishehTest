import { ChartPeriod, Department, RequestStatus } from '../types'

export const trendData = [
  { month: 'مهر', current: 42, previous: 35 },
  { month: 'آبان', current: 68, previous: 47 },
  { month: 'آذر', current: 52, previous: 59 },
  { month: 'دی', current: 38, previous: 45 },
  { month: 'بهمن', current: 73, previous: 57 },
  { month: 'اسفند', current: 61, previous: 70 },
]

export const departmentData = [
  { department: Department.Sales, approved: 68, pending: 48 },
  { department: Department.Marketing, approved: 53, pending: 48 },
  { department: Department.Technology, approved: 77, pending: 47 },
  { department: Department.Finance, approved: 46, pending: 47 },
  { department: Department.HumanResources, approved: 46, pending: 91 },
  { department: Department.Operations, approved: 53, pending: 49 },
]

export const statusData = [
  { status: RequestStatus.Approved, value: 38, color: '#4285f4' },
  { status: RequestStatus.Pending, value: 47, color: '#37c99a' },
  { status: RequestStatus.Rejected, value: 26, color: '#f5ae3d' },
  { status: RequestStatus.Cancelled, value: 14, color: '#a779ea' },
]

export const chartFilterOptions = {
  periods: [ChartPeriod.Weekly, ChartPeriod.Monthly, ChartPeriod.Yearly],
  departments: ['all', Department.Sales, Department.Technology],
  weekLabels: ['۱', '۲', '۳', '۴', '۵', '۶'],
  yearLabels: ['۱۴۰۰', '۱۴۰۱', '۱۴۰۲', '۱۴۰۳', '۱۴۰۴', '۱۴۰۵'],
  defaults: {
    period: ChartPeriod.Monthly,
    department: 'all',
  },
} as const
