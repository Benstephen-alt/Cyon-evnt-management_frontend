export interface CommitteeModule {
  permission: string;
  title: string;
  href: string;
  icon: string;
}

export const COMMITTEE_MODULES: CommitteeModule[] = [
  {
    permission: "BUDGET",
    title: "Budget",
    href: "/committee/budget",
    icon: "💰",
  },

  {
    permission: "EXPENSES",
    title: "Expenses",
    href: "/committee/expenses",
    icon: "💳",
  },

  {
    permission: "FUND_RELEASES",
    title: "Fund Releases",
    href: "/committee/fund-releases",
    icon: "🏦",
  },

  {
    permission: "HOSTELS",
    title: "Hostels",
    href: "/committee/hostels",
    icon: "🏨",
  },

  {
    permission: "HALLS",
    title: "Halls",
    href: "/committee/halls",
    icon: "🏢",
  },

  {
    permission: "BEDS",
    title: "Beds",
    href: "/committee/beds",
    icon: "🛏️",
  },

  {
    permission: "DELEGATE_ALLOCATION",
    title: "Delegate Allocation",
    href: "/committee/delegate-allocation",
    icon: "👥",
  },

  {
    permission: "CHECK_IN",
    title: "Delegate Check-In",
    href: "/committee/check-in",
    icon: "✅",
  },

  {
    permission: "QR_SCANNER",
    title: "QR Scanner",
    href: "/committee/scanner",
    icon: "📷",
  },

  {
    permission: "ANNOUNCEMENTS",
    title: "Announcements",
    href: "/committee/announcements",
    icon: "📢",
  },

  {
    permission: "REPORTS",
    title: "Reports",
    href: "/committee/reports",
    icon: "📊",
  },

  {
    permission: "SETTINGS",
    title: "Settings",
    href: "/committee/settings",
    icon: "⚙️",
  },
];