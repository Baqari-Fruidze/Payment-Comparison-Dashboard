export function getMonthValue(yearMonth: string) {
  // yearMonth expected format: "YYYY-MM" (e.g., "2026-04")
  const [year, month] = yearMonth.split('-').map(Number);
  
  // Day 0 of the next month gives us the last day of the target month
  const lastDay = new Date(year, month, 0).getDate(); 
  
  return {
    startDate: `${yearMonth}-01`,
    endDate: `${yearMonth}-${lastDay}`
  };
}