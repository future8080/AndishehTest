export const RequestStatus = {
  Pending: 'pending',
  Approved: 'approved',
  Rejected: 'rejected',
  Cancelled: 'cancelled',
} as const
export type RequestStatus = typeof RequestStatus[keyof typeof RequestStatus]

export const Department = {
  Sales: 'sales',
  Marketing: 'marketing',
  Technology: 'technology',
  Finance: 'finance',
  HumanResources: 'human_resources',
  Operations: 'operations',
} as const
export type Department = typeof Department[keyof typeof Department]

export const LoanType = {
  Personal: 'personal',
  Education: 'education',
  Housing: 'housing',
} as const
export type LoanType = typeof LoanType[keyof typeof LoanType]

export const ChartPeriod = {
  Weekly: 'weekly',
  Monthly: 'monthly',
  Yearly: 'yearly',
} as const
export type ChartPeriod = typeof ChartPeriod[keyof typeof ChartPeriod]

export type RequestStatusFilter = RequestStatus | 'all'
export type DepartmentFilter = Department | 'all'
export type DashboardTab = 'stats' | 'charts' | 'requests'

export interface LoanRequest {
  id: number
  employee: string
  initials: string
  department: Department
  type: LoanType
  amount: number
  date: string
  status: RequestStatus
}

export type RequestFormValues = Pick<
  LoanRequest,
  'employee' | 'department' | 'type' | 'amount' | 'date' | 'status'
>
