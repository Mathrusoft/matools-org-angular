import { jsPDF } from "jspdf";

export function generateMonthlyData(
    startDate: Date,
    endDate: Date,
    todayDate: Date
  ): { month: string; startDate: string; endDate: string; receiptDate: string }[] {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    // Validation: Check if the duration exceeds 12 months
    const start = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
    const end = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
    const diffMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    if (diffMonths > 12 || diffMonths <= 0) {
      return [];
    }
  
    const result: { month: string; startDate: string; endDate: string; receiptDate: string }[] = [];
    let current = new Date(startDate);
  
    while (current <= endDate) {
      const month = monthNames[current.getMonth()];
      const isStartMonth = current.getFullYear() === startDate.getFullYear() && current.getMonth() === startDate.getMonth();
      const isEndMonth = current.getFullYear() === endDate.getFullYear() && current.getMonth() === endDate.getMonth();
  
      const monthStartDate = isStartMonth
        ? `${formatDateOrdinal(startDate.getDate())} ${month} ${current.getFullYear()}`
        : `01st ${month} ${current.getFullYear()}`;
      const monthEndDate = isEndMonth
        ? `${formatDateOrdinal(endDate.getDate())} ${month} ${current.getFullYear()}`
        : `${formatDateOrdinal(getLastDayOfMonth(current))} ${month} ${current.getFullYear()}`;
  
      // Correct receiptDate logic
      const monthEndDateObject = new Date(current.getFullYear(), current.getMonth(), isEndMonth ? endDate.getDate() : getLastDayOfMonth(current));
      const receiptDate =
        monthEndDateObject <= todayDate
          ? monthEndDate
          : `${formatDateOrdinal(todayDate.getDate())} ${monthNames[todayDate.getMonth()]} ${todayDate.getFullYear()}`;
  
      result.push({
        month,
        startDate: monthStartDate,
        endDate: monthEndDate,
        receiptDate,
      });
  
      current.setMonth(current.getMonth() + 1);
      current.setDate(1);
    }
  
    return result;
  }
  
  // Helper function: Get the last day of the month
  function getLastDayOfMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }
  
  // Helper function: Format date ordinal (e.g., 1 -> "01st", 2 -> "02nd")
  function formatDateOrdinal(date: number): string {
    const suffix = ["th", "st", "nd", "rd"];
    const value = date % 100;
    return `${date.toString().padStart(2, "0")}${suffix[(value - 20) % 10] || suffix[value] || suffix[0]}`;
  }
  
  // Example usage:
  const startDate = new Date(2024, 4, 1); // 12th November 2024
  const endDate = new Date(2025, 3, 31);   // 31st March 2025
  const todayDate = new Date(2025, 0, 24); // 24th January 2025
  
  const result = generateMonthlyData(startDate, endDate, todayDate);
  console.log(result);
  
