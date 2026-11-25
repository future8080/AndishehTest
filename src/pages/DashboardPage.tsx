import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { CalendarDays, Check, ChevronDown, Download } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { DashboardTabs } from "../components/DashboardTabs";
import { Header } from "../components/Header";
import { MobileTabBar } from "../components/MobileTabBar";
import { RequestModal } from "../components/RequestModal";
import { RequestsTable } from "../components/RequestsTable";
import { Sidebar } from "../components/Sidebar";
import { StatsCards } from "../components/StatsCards";
import { StatsOverview } from "../components/StatsOverview";
import { dashboardDefaults } from "../data/dashboard";
import { initialRequests } from "../data/requests";
import { useClickOutside } from "../hooks/useClickOutside";
import { useToast } from "../hooks/useToast";
import type {
  DashboardTab,
  LoanRequest,
  RequestFormValues,
  RequestStatusFilter,
} from "../types";
import { downloadRequestsCsv } from "../utils/exportRequests";
import { getInitials } from "../utils/employee";
import { filterLoanRequests } from "../utils/requests";
import "../styles/dashboard.css";

const ChartsPanel = lazy(() =>
  import("../components/ChartsPanel").then(({ ChartsPanel }) => ({
    default: ChartsPanel,
  })),
);

export function DashboardPage() {
  const [requests, setRequests] = useState(initialRequests);
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia("(max-width: 600px)").matches,
  );
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<RequestStatusFilter>("all");
  const [activePage, setActivePage] = useState("داشبورد");
  const [activeTab, setActiveTab] = useState<DashboardTab>("stats");
  const [range, setRange] = useState<string>(dashboardDefaults.dateRange);
  const [showRange, setShowRange] = useState(false);
  const [modal, setModal] = useState<{
    mode: "create" | "edit" | "view";
    request?: LoanRequest;
  } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dateRangeRef = useClickOutside<HTMLDivElement>(() => setShowRange(false));
  const toast = useToast();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 600px)");
    const handleChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const filteredRequests = useMemo(
    () => filterLoanRequests(requests, { range, search, status: statusFilter }),
    [requests, range, search, statusFilter],
  );

  function saveRequest(values: RequestFormValues) {
    if (modal?.mode === "edit" && modal.request) {
      setRequests((current) =>
        current.map((request) =>
          request.id === modal.request?.id
            ? { ...request, ...values, initials: getInitials(values.employee) }
            : request,
        ),
      );
      toast.success("تغییرات درخواست با موفقیت ذخیره شد.");
    } else {
      const newRequest: LoanRequest = {
        ...values,
        id: Math.max(0, ...requests.map((request) => request.id)) + 1,
        initials: getInitials(values.employee),
      };
      setRequests((current) => [newRequest, ...current]);
      toast.success("درخواست جدید با موفقیت ثبت شد.");
    }
    setModal(null);
  }

  function deleteRequest(request: LoanRequest) {
    if (!window.confirm(`درخواست ${request.employee} حذف شود؟`)) return;
    setRequests((current) => current.filter((item) => item.id !== request.id));
    toast.success("درخواست حذف شد.");
  }

  function exportReport() {
    downloadRequestsCsv(filteredRequests);
    toast.success("گزارش درخواست‌ها دانلود شد.");
  }

  return (
    <div className="app-shell" dir="rtl">
      <Toaster
        position="bottom-left"
        toastOptions={{
          duration: 2800,
          style: {
            background: "var(--surface)",
            border: "1px solid var(--border)",
            color: "var(--text)",
            direction: "rtl",
            fontFamily: "inherit",
            fontSize: "11px",
          },
        }}
      />
      {sidebarOpen && (
        <button
          className="sidebar-backdrop"
          aria-label="بستن منو"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <Sidebar
        activePage={activePage}
        onNavigate={(page) => {
          setActivePage(page);
          if (page === "داشبورد") setActiveTab("stats");
          else if (
            page === "درخواست‌های وام" ||
            page === "صف بررسی" ||
            page === "تاریخچه وام"
          )
            setActiveTab("requests");
          else if (page === "گزارش‌ها" || page === "تحلیل‌ها") setActiveTab("charts");
          setSidebarOpen(false);
        }}
      />
      <main className="main-area">
        <Header
          search={search}
          onSearch={setSearch}
          onMenu={() => setSidebarOpen(true)}
        />
        <div className="dashboard-content">
          <div className="page-heading">
            <div className="heading-copy">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                پنل مدیریت منابع انسانی
              </div>
              <h1>داشبورد</h1>
              <p>درخواست‌های وام کارکنان را مدیریت و پیگیری کنید.</p>
            </div>
            <div className="heading-actions">
              <div className="date-wrap" ref={dateRangeRef}>
                <button
                  className="date-button"
                  onClick={() => setShowRange((show) => !show)}
                >
                  <CalendarDays size={17} />
                  <span>{range}</span>
                  <ChevronDown size={15} />
                </button>
                {showRange && (
                  <div className="select-menu date-menu">
                    {dashboardDefaults.dateRangeOptions.map((item) => (
                      <button
                        key={item}
                        onClick={() => {
                          setRange(item);
                          setShowRange(false);
                        }}
                      >
                        {item}
                        {range === item && <Check size={14} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button className="export-button" onClick={exportReport}>
                <Download size={16} />
                <span>خروجی گزارش</span>
              </button>
            </div>
          </div>
          <DashboardTabs
            activeTab={activeTab}
            requestCount={filteredRequests.length}
            onChange={setActiveTab}
          />
          {(!isMobile || activeTab === "stats") && (
            <div className={`dashboard-panel ${activeTab === "stats" ? "active" : ""}`}>
              <StatsCards requests={requests} />
              <StatsOverview requests={requests} />
            </div>
          )}
          {(!isMobile || activeTab === "charts") && (
            <div className={`dashboard-panel ${activeTab === "charts" ? "active" : ""}`}>
              <Suspense
                fallback={
                  <div className="charts-loading" role="status">
                    در حال بارگذاری نمودارها...
                  </div>
                }
              >
                <ChartsPanel />
              </Suspense>
            </div>
          )}
          {(!isMobile || activeTab === "requests") && (
            <div
              className={`dashboard-panel ${activeTab === "requests" ? "active" : ""}`}
            >
              <RequestsTable
                requests={filteredRequests}
                search={search}
                onSearch={setSearch}
                statusFilter={statusFilter}
                onStatusFilter={setStatusFilter}
                onCreate={() => setModal({ mode: "create" })}
                onView={(request) => setModal({ mode: "view", request })}
                onEdit={(request) => setModal({ mode: "edit", request })}
                onDelete={deleteRequest}
              />
            </div>
          )}
        </div>
      </main>
      {modal && (
        <RequestModal
          mode={modal.mode}
          request={modal.request}
          onClose={() => setModal(null)}
          onSave={saveRequest}
        />
      )}
      <MobileTabBar
        activeTab={activeTab}
        onNavigate={setActiveTab}
        onSettings={() => setSidebarOpen(true)}
      />
    </div>
  );
}
