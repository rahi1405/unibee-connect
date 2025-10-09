export const departmentMap: Record<string, string> = {
  "01": "Civil Engineering",
  "02": "EEE",
  "03": "Mechanical Engineering",
  "04": "CSE",
  "05": "Urban & Regional Planning",
  "06": "Architecture",
  "07": "Petroleum & Mining Engineering",
  "08": "ETE",
  "11": "Biomedical Engineering",
};

export const getDepartmentName = (deptId: string | null): string => {
  if (!deptId) return "Unknown";
  return departmentMap[deptId] || `Dept ${deptId}`;
};
