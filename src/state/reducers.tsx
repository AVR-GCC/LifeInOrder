import moment from "moment";
import type { DeleteHabitReducer, DeleteValueReducer, MainProps, SetDayValueReducer, SwitchHabitsReducer, SwitchValuesReducer, UpdateValueReducer } from "../types/index.jsx";

const SPARE_DATES = 50;
const dateFormat = 'YYYY-MM-DD';

export const loadDataReducer = (data: MainProps) => () => {
  if (data === null) return null;
  const { dates, habits } = data;
  const datesEmpty = !dates.length;
  let datesIndex = 0;
  const datesFilled = [];
  const incrementalDate = datesEmpty ? moment() : moment(dates[0].date);
  let nextDate = incrementalDate.format(dateFormat);
  while (datesIndex < dates.length) {
    const currentIncremental = incrementalDate.format(dateFormat);
    if (currentIncremental === nextDate) {
      datesFilled.push(dates[datesIndex]);
      datesIndex++;
      if (datesIndex === dates.length) break;
      nextDate = dates[datesIndex].date;
    } else {
      datesFilled.push({ date: currentIncremental, values: {} });
    }
    incrementalDate.add(1, 'd');
  }
  const currentDate = datesEmpty ? moment() : moment(dates[dates.length - 1].date).add(1, 'd');
  const newDates = new Array(SPARE_DATES);
  for (let i = 0; i < SPARE_DATES; i++) {
    newDates[i] = { date: currentDate.format(dateFormat), values: {} };
    currentDate.add(1, 'd');
  }

  return { dates: [...datesFilled, ...newDates], habits };
}

export const setDayHabitValueReducer: SetDayValueReducer = (data) => (dateIndex, habitIndex, valueId) => {
  if (data === null) return null;
  const { dates, habits } = data;
  const newDates = [...dates];
  const habitObj = habits[habitIndex];
  if (!newDates[dateIndex]) {
    for (let i = newDates.length; i <= dateIndex; i++) {
      newDates.push({ date: moment(newDates[i - 1].date).add(1, 'd').format('YYYY-MM-DD'), values: {} });
    }
  }
  newDates[dateIndex].values[habitObj.habit.id] = valueId;
  return { habits, dates: newDates };
}

export const deleteHabitReducer: DeleteHabitReducer = (data) => (index) => {
  if (data === null) return null;
  const { habits } = data;
  const newHabits = [...habits];
  newHabits.splice(index, 1);
  return { ...data, habits: newHabits };
}

export const switchHabitsReducer: SwitchHabitsReducer = (data) => (isDown, index) => {
  if (data === null) return null;
  const { habits } = data;
  const otherIndex = index + (isDown ? 1 : -1);
  const thisHabit = habits[index];
  const otherHabit = habits[otherIndex];
  const thisSequence = thisHabit.habit.sequence;
  const otherSequence = otherHabit.habit.sequence;
  const newHabits = [...habits];
  newHabits[index] = { ...otherHabit, habit: { ...otherHabit.habit, sequence: thisSequence } };
  newHabits[otherIndex] = { ...thisHabit, habit: { ...thisHabit.habit, sequence: otherSequence } };
  return { ...data, habits: newHabits };
}

export const deleteValueReducer: DeleteValueReducer = (data) => (habitIndex, valueIndex) => {
  if (data === null) return null;
  const { habits } = data;
  const newHabits = [...habits];
  const newValues = [...newHabits[habitIndex].values];
  newValues.splice(valueIndex, 1);
  newHabits[habitIndex].values = newValues;
  return { ...data, habits: newHabits };
}

export const switchValuesReducer: SwitchValuesReducer = (data) => (isDown, habitIndex, valueIndex) => {
  if (data === null) return null;
  const { habits } = data;
  const otherIndex = valueIndex + (isDown ? 1 : -1);
  const thisValue = habits[habitIndex].values[valueIndex];
  const otherValue = habits[habitIndex].values[otherIndex];
  const thisSequence = thisValue.sequence;
  const otherSequence = otherValue.sequence;
  const newHabits = [...habits];
  const newValues = [...habits[habitIndex].values];
  newHabits[habitIndex].values_hashmap[thisValue.id] = otherIndex;
  newHabits[habitIndex].values_hashmap[otherValue.id] = valueIndex;
  newValues[valueIndex] = { ...otherValue, sequence: thisSequence };
  newValues[otherIndex] = { ...thisValue, sequence: otherSequence };
  newHabits[habitIndex].values = newValues;
  return { ...data, habits: newHabits };
}

export const updateValueReducer: UpdateValueReducer = (data) => (habitIndex, valueIndex, newValueValues) => {
  if (data === null) return null;
  const { habits } = data;
  const thisValue = habits[habitIndex].values[valueIndex];
  const newValue = { ...thisValue, ...newValueValues };
  const newHabits = [...habits];
  const newValues = [...habits[habitIndex].values];
  newValues[valueIndex] = newValue;
  newHabits[habitIndex].values = newValues;
  return { ...data, habits: newHabits };
}
