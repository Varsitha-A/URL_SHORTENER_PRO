import { useState, useEffect } from "react";
import {
  FiUser,
  FiLock,
  FiBell,
  FiTrash2,
  FiMoon,
  FiShield,
  FiCpu,
  FiWifi,
  FiKey,
  FiRefreshCw,
  FiGlobe,
  FiEye,
  FiSmartphone,
  FiActivity,
  FiDatabase,
} from "react-icons/fi";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [twoFA, setTwoFA] = useState(false);
  const [apiAccess, setApiAccess] = useState(true);
  const [compactMode, setCompactMode] = useState(false);

  // NEW STATES
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [deviceTracking, setDeviceTracking] = useState(true);
  const [geoTracking, setGeoTracking] = useState(false);
  const [realTimeAnalytics, setRealTimeAnalytics] = useState(true);
  const [botFiltering, setBotFiltering] = useState(true);

  const Toggle = ({ label, icon: Icon, value, setValue }) => {
    return (
      <div className="w-full flex items-center justify-between px-6 py-5 bg-[#161d18] border border-[#6b7550] rounded-2xl shadow-md hover:shadow-lg transition-all">

        <div className="flex items-center gap-4 text-[#e7d7c1] text-lg font-medium">
          <div className="p-3 rounded-xl bg-[#0f1410] border border-[#6b7550]">
            <Icon />
          </div>
          <span>{label}</span>
        </div>

        <button
          onClick={() => setValue(!value)}
          className={`
            px-6 py-2 rounded-full font-semibold transition-all duration-300
            ${value
              ? "bg-[#7CFC00] text-black"
              : "bg-[#0f1410] border border-[#6b7550] text-[#c9b08a]"
            }
          `}
        >
          {value ? "ON" : "OFF"}
        </button>
      </div>
    );
  };

  useEffect(() => {
    document.body.style.background = "#0f1410";
    document.body.style.color = "#e7d7c1";
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#0f1410] text-[#e7d7c1] px-10 py-8">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-5xl font-bold">Settings</h1>
        <p className="text-[#c9b08a] mt-3 text-lg">
          Manage all your account preferences and system controls
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">

        {/* LEFT FULL SETTINGS */}
        <div className="xl:col-span-2 space-y-5">

          {/* ACCOUNT */}
          <h2 className="text-xl font-bold text-[#7CFC00] mt-2">Account</h2>

          <Toggle label="Profile Visibility" icon={FiEye} value={profileVisibility} setValue={setProfileVisibility} />

          {/* SECURITY */}
          <h2 className="text-xl font-bold text-[#7CFC00] mt-6">Security</h2>

          <Toggle label="Two Factor Authentication" icon={FiShield} value={twoFA} setValue={setTwoFA} />
          <Toggle label="Login Alerts" icon={FiLock} value={loginAlerts} setValue={setLoginAlerts} />
          <Toggle label="Device Management" icon={FiSmartphone} value={deviceTracking} setValue={setDeviceTracking} />

          {/* NOTIFICATIONS */}
          <h2 className="text-xl font-bold text-[#7CFC00] mt-6">Notifications</h2>

          <Toggle label="Push Notifications" icon={FiBell} value={pushNotifications} setValue={setPushNotifications} />
          <Toggle label="Email Alerts" icon={FiWifi} value={emailAlerts} setValue={setEmailAlerts} />
          <Toggle label="Weekly Reports" icon={FiActivity} value={weeklyReports} setValue={setWeeklyReports} />

          {/* SYSTEM */}
          <h2 className="text-xl font-bold text-[#7CFC00] mt-6">System</h2>

          <Toggle label="Dark Mode" icon={FiMoon} value={darkMode} setValue={setDarkMode} />
          <Toggle label="Auto Refresh" icon={FiRefreshCw} value={autoRefresh} setValue={setAutoRefresh} />
          <Toggle label="Compact Mode" icon={FiCpu} value={compactMode} setValue={setCompactMode} />

          {/* ANALYTICS */}
          <h2 className="text-xl font-bold text-[#7CFC00] mt-6">Analytics</h2>

          <Toggle label="Real-time Analytics" icon={FiActivity} value={realTimeAnalytics} setValue={setRealTimeAnalytics} />
          <Toggle label="Bot Filtering" icon={FiDatabase} value={botFiltering} setValue={setBotFiltering} />
          <Toggle label="Geo Tracking" icon={FiGlobe} value={geoTracking} setValue={setGeoTracking} />

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          <div className="bg-[#161d18] border border-red-500/30 rounded-3xl p-8">
            <div className="flex items-center gap-3 text-red-400 font-bold text-xl">
              <FiTrash2 /> Danger Zone
            </div>

            <p className="text-[#c9b08a] mt-4">
              Delete your account permanently. This action cannot be undone.
            </p>

            <button className="mt-6 w-full px-6 py-4 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600">
              Delete Account
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}