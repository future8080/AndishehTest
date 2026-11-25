import { Department, LoanType, RequestStatus } from '../types'
import type { LoanRequest, RequestFormValues } from '../types'

export const requestFormOptions = {
  departments: [
    Department.Sales,
    Department.Marketing,
    Department.Technology,
    Department.Finance,
    Department.HumanResources,
    Department.Operations,
  ],
  loanTypes: [LoanType.Personal, LoanType.Education, LoanType.Housing],
  statuses: [
    RequestStatus.Pending,
    RequestStatus.Approved,
    RequestStatus.Rejected,
    RequestStatus.Cancelled,
  ],
  placeholders: {
    employee: 'مثلاً نگار محمدی',
    amount: '۵۰٬۰۰۰٬۰۰۰',
  },
}

export const defaultRequestFormValues: RequestFormValues = {
  employee: '',
  department: Department.Sales,
  type: LoanType.Personal,
  amount: 0,
  date: '۱۴۰۴/۰۲/۱۰',
  status: RequestStatus.Pending,
}

export const initialRequests: LoanRequest[] = [
  { id: 1, employee: 'نگار محمدی', initials: 'ن‌م', department: Department.Sales, type: LoanType.Personal, amount: 50000000, date: '۱۴۰۴/۰۲/۰۵', status: RequestStatus.Approved },
  { id: 2, employee: 'علی رضایی', initials: 'ع‌ر', department: Department.Marketing, type: LoanType.Education, amount: 70000000, date: '۱۴۰۴/۰۲/۰۳', status: RequestStatus.Pending },
  { id: 3, employee: 'سارا احمدی', initials: 'س‌ا', department: Department.Technology, type: LoanType.Personal, amount: 100000000, date: '۱۴۰۴/۰۲/۰۱', status: RequestStatus.Rejected },
  { id: 4, employee: 'امیرحسین کریمی', initials: 'ا‌ک', department: Department.Finance, type: LoanType.Housing, amount: 60000000, date: '۱۴۰۴/۰۲/۰۱', status: RequestStatus.Cancelled },
  { id: 5, employee: 'مریم قاسمی', initials: 'م‌ق', department: Department.Operations, type: LoanType.Personal, amount: 45000000, date: '۱۴۰۴/۰۱/۲۹', status: RequestStatus.Approved },
  { id: 6, employee: 'محمد صادقی', initials: 'م‌ص', department: Department.Sales, type: LoanType.Housing, amount: 85000000, date: '۱۴۰۴/۰۱/۲۷', status: RequestStatus.Pending },
  { id: 7, employee: 'الهام اکبری', initials: 'ا‌ا', department: Department.Marketing, type: LoanType.Education, amount: 35000000, date: '۱۴۰۴/۰۱/۲۵', status: RequestStatus.Approved },
  { id: 8, employee: 'رضا نادری', initials: 'ر‌ن', department: Department.Technology, type: LoanType.Personal, amount: 55000000, date: '۱۴۰۴/۰۱/۲۲', status: RequestStatus.Pending },
  { id: 9, employee: 'پریسا حیدری', initials: 'پ‌ح', department: Department.Finance, type: LoanType.Housing, amount: 90000000, date: '۱۴۰۴/۰۱/۲۰', status: RequestStatus.Approved },
  { id: 10, employee: 'وحید رستمی', initials: 'و‌ر', department: Department.Operations, type: LoanType.Personal, amount: 40000000, date: '۱۴۰۴/۰۱/۱۸', status: RequestStatus.Rejected },
  { id: 11, employee: 'لیلا موسوی', initials: 'ل‌م', department: Department.Sales, type: LoanType.Education, amount: 30000000, date: '۱۴۰۴/۰۱/۱۶', status: RequestStatus.Pending },
  { id: 12, employee: 'آرمان یوسفی', initials: 'آ‌ی', department: Department.Technology, type: LoanType.Personal, amount: 75000000, date: '۱۴۰۴/۰۱/۱۴', status: RequestStatus.Approved },
]
