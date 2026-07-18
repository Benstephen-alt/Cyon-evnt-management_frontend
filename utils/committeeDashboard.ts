const DASHBOARD_COMMITTEES = [
  "Feeding",
  "Accommodation Committee",
  "Transport Committee",
  "Security",
  "Medical",
  "Welfare",
  "Publicity",
];

export function hasCommitteeDashboard(
  committeeName: string
): boolean {
  return DASHBOARD_COMMITTEES.includes(
    committeeName
  );
}