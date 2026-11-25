import { useEffect, useRef, useState } from "react";
import {
  BatteryFull,
  Bell,
  BriefcaseBusiness,
  ChevronDown,
  Menu,
  Moon,
  Search,
  Signal,
  Sun,
  Wifi,
} from "lucide-react";
import { dashboardDefaults } from "../data/dashboard";
import { useClickOutside } from "../hooks/useClickOutside";
import { formatPersianNumber } from "../utils/format";

interface HeaderProps {
  search: string;
  onSearch: (value: string) => void;
  onMenu: () => void;
}

export function Header({ search, onSearch, onMenu }: HeaderProps) {
  const searchRef = useRef<HTMLInputElement>(null);
  const [dark, setDark] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notificationRef = useClickOutside<HTMLDivElement>(() =>
    setShowNotifications(false),
  );
  const profileRef = useClickOutside<HTMLDivElement>(() => setShowProfile(false));

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
  }

  return (
    <>
      <header className="topbar">
        <button
          className="icon-button mobile-menu"
          onClick={onMenu}
          aria-label="باز کردن منو"
        >
          <Menu size={20} />
        </button>
        <div className="mobile-brand">
          <span className="brand-mark">
            <BriefcaseBusiness size={19} />
          </span>
          <strong>همراه‌وام</strong>
        </div>
        <label className="global-search">
          <Search size={18} />
          <input
            ref={searchRef}
            value={search}
            onChange={(event) => onSearch(event.target.value)}
            placeholder="جست‌وجو در درخواست‌ها، کارمندان..."
          />
        </label>
        <div className="topbar-actions">
          <button
            className="icon-button theme-toggle"
            onClick={toggleTheme}
            aria-label={dark ? "حالت روشن" : "حالت تیره"}
          >
            {dark ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          <div className="popover-wrap" ref={notificationRef}>
            <button
              className="icon-button notification-button"
              onClick={() => setShowNotifications((show) => !show)}
              aria-label="اعلان‌ها"
            >
              <Bell size={19} />
              <span className="notification-dot" />
            </button>
            {showNotifications && (
              <div className="header-popover notification-popover">
                <strong>اعلان‌های اخیر</strong>
                <p>
                  {formatPersianNumber(dashboardDefaults.notificationCount)} درخواست جدید
                  برای بررسی دارید.
                </p>
                <button onClick={() => setShowNotifications(false)}>متوجه شدم</button>
              </div>
            )}
          </div>
          <span className="topbar-divider" />
          <div className="popover-wrap" ref={profileRef}>
            <button
              className="profile-button"
              onClick={() => setShowProfile((show) => !show)}
            >
              <span className="avatar profile-avatar">
                {dashboardDefaults.profile.initials}
              </span>
              <span className="profile-copy">
                <strong>{dashboardDefaults.profile.name}</strong>
                <small>{dashboardDefaults.profile.role}</small>
              </span>
              <ChevronDown size={16} />
            </button>
            {showProfile && (
              <div className="header-popover profile-popover">
                <strong>حساب کاربری</strong>
                <button onClick={() => setShowProfile(false)}>مشاهده پروفایل</button>
                <button onClick={() => setShowProfile(false)}>خروج از حساب</button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
