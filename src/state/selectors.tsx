import type { GetDayHabitValueSelector } from "../types/index.jsx";

export const getDayHabitValueSelector: GetDayHabitValueSelector = (data) => (dateIndex, habitIndex) => {
  if (data === null) return null;
  const { dates, habits } = data;
  const day = dates[dateIndex];
  const habitObj = habits[habitIndex];
  const dayValue = day.values[habitObj.habit.id];
  const valueIndex = habitObj.values_hashmap[dayValue];
  const valueObj = habitObj.values[valueIndex];
  return valueObj;
}
