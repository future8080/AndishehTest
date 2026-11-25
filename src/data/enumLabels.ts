import { ChartPeriod, Department, LoanType, RequestStatus } from '../types'

export const requestStatusLabels: Record<RequestStatus, string> = {
  [RequestStatus.Pending]: 'در انتظار',
  [RequestStatus.Approved]: 'تأیید شده',
  [RequestStatus.Rejected]: 'رد شده',
  [RequestStatus.Cancelled]: 'لغو شده',
}

export const departmentLabels: Record<Department, string> = {
  [Department.Sales]: 'فروش',
  [Department.Marketing]: 'بازاریابی',
  [Department.Technology]: 'فناوری',
  [Department.Finance]: 'مالی',
  [Department.HumanResources]: 'منابع انسانی',
  [Department.Operations]: 'عملیات',
}

export const loanTypeLabels: Record<LoanType, string> = {
  [LoanType.Personal]: 'وام شخصی',
  [LoanType.Education]: 'وام تحصیلی',
  [LoanType.Housing]: 'وام مسکن',
}

export const chartPeriodLabels: Record<ChartPeriod, string> = {
  [ChartPeriod.Weekly]: 'هفتگی',
  [ChartPeriod.Monthly]: 'ماهانه',
  [ChartPeriod.Yearly]: 'سالانه',
}

export const allStatusesLabel = 'همه وضعیت‌ها'
export const allDepartmentsLabel = 'همه واحدها'
