export const dashboardDefaults = {
  dateRange: "۱ تا ۳۱ اردیبهشت ۱۴۰۴",
  dateRangeOptions: ["۱ تا ۳۱ اردیبهشت ۱۴۰۴", "۱ تا ۳۱ فروردین ۱۴۰۴", "سه‌ماهه اخیر"],
  mobileStatusTime: "۹:۴۱",
  appVersion: "۲.۴.۰",
  copyrightYear: "۱۴۰۴",
  profile: {
    initials: "س‌م",
    name: "مجتبی نوری",
    role: "مدیر منابع انسانی",
  },
  notificationCount: 3,
  sidebarBadges: {
    loanRequests: 12,
    pendingQueue: 5,
  },
  statChanges: {
    total: { change: "+۱۲٫۸٪", note: "نسبت به ماه گذشته", direction: "up" },
    approved: { change: "+۸٫۲٪", note: "نسبت به ماه گذشته", direction: "up" },
    pending: { change: "+۱۶٫۴٪", note: "نیازمند اقدام", direction: "up" },
    rejected: { change: "−۳٫۱٪", note: "نسبت به ماه گذشته", direction: "down" },
  },
} as const;
