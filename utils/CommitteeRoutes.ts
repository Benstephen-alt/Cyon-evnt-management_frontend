export interface CommitteeRoute {
  path: string;
  dashboard: boolean;
  icon: string;
  description: string;
}

export const committeeRoutes: Record<
  string,
  CommitteeRoute
> = {
  Finance: {
    path: "/committee/finance",
    dashboard: false,
    icon: "💰",
    description: "Finance management",
  },

  Feeding: {
    path: "/committees/dashboard",
    dashboard: true,
    icon: "🍽️",
    description: "Expense management",
  },

  Accommodation: {
    path: "/committee/accommodation",
    dashboard: false,
    icon: "🛏️",
    description: "Expense management",
  },

  Medical: {
    path: "/committees/dashboard",
    dashboard: true,
    icon: "🏥",
    description: "Expense management",
  },

  Security: {
    path: "/committees/dashboard",
    dashboard: true,
    icon: "🛡️",
    description: "Expense management",
  },

  Welfare: {
    path: "/committees/dashboard",
    dashboard: true,
    icon: "🤝",
    description: "Expense management",
  },

  Liturgy: {
    path: "/committees/dashboard",
    dashboard: true,
    icon: "⛪",
    description: "Liturgy management",
  },

  ICT: {
    path: "/committees/dashboard",
    dashboard: true,
    icon: "💻",
    description: "ICT management",
  },

  Media: {
    path: "/committees/dashboard",
    dashboard: true,
    icon: "📷",
    description: "Media management",
  },

  Registration: {
    path: "/committee/vendor",
    dashboard: false,
    icon: "📝",
    description: "Delegate registration",
  },

  Protocol: {
    path: "/committees/dashboard",
    dashboard: true,
    icon: "🎤",
    description: "Protocol management",
  },
};