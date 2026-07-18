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
    path: "/committees/dashboard",
    dashboard: true,
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
    path: "/committee/liturgy",
    dashboard: false,
    icon: "⛪",
    description: "Liturgy management",
  },

  ICT: {
    path: "/committee/ict",
    dashboard: false,
    icon: "💻",
    description: "ICT management",
  },

  Media: {
    path: "/committee/media",
    dashboard: false,
    icon: "📷",
    description: "Media management",
  },

  Registration: {
    path: "/committee/registration",
    dashboard: false,
    icon: "📝",
    description: "Delegate registration",
  },

  Protocol: {
    path: "/committee/protocol",
    dashboard: false,
    icon: "🎤",
    description: "Protocol management",
  },
};