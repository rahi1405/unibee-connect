export const departmentMap: Record<string, string> = {
  '01': 'ME',
  '02': 'EEE',
  '03': 'CE',
  '04': 'CSE',
  '05': 'ETE',
  '06': 'IPE',
  '07': 'ChE',
  '08': 'Arch',
  '09': 'URP',
  '10': 'BECM',
  '11': 'MME',
  '12': 'PME',
};

export const departmentFullNames: Record<string, string> = {
  '01': 'Mechanical Engineering',
  '02': 'Electrical and Electronic Engineering',
  '03': 'Civil Engineering',
  '04': 'Computer Science and Engineering',
  '05': 'Electronics and Telecommunication Engineering',
  '06': 'Industrial and Production Engineering',
  '07': 'Chemical Engineering',
  '08': 'Architecture',
  '09': 'Urban and Regional Planning',
  '10': 'Building Engineering and Construction Management',
  '11': 'Materials and Metallurgical Engineering',
  '12': 'Petroleum and Mining Engineering',
};

export const getDepartmentName = (id: string): string => {
  return departmentMap[id] || id;
};

export const getDepartmentFullName = (id: string): string => {
  return departmentFullNames[id] || `Department ${id}`;
};
