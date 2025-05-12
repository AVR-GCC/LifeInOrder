import { useEffect, useState } from '@lynx-js/react';
import { MemoryRouter, Routes, Route } from 'react-router';

import './App.css';
import Main from './screens/main.jsx';
import Day from './screens/day/index.jsx';
import Habits from './screens/habits/index.jsx';
import Values from './screens/values/index.jsx';
import { deleteHabitServer, getUserList, reorderHabitsServer, setDayValueServer, reorderValuesServer } from './server/index.jsx';
import type { DeleteHabit, GetDayHabitValue, MainProps, SetDayValue, SwitchHabits, DeleteValue, SwitchValues, UpdateValue } from './types/index.jsx';
import { deleteHabitReducer, loadDataReducer, setDayHabitValueReducer, switchHabitsReducer, switchValuesReducer, updateValueReducer } from './state/reducers.jsx';
import { getDayHabitValueSelector } from './state/selectors.jsx';

export const UNFILLED_COLOR = '#555555';

export const App = () => {
  const [data, setData] = useState<MainProps>(null);
  console.log('data', data);

  const loadData = async () => {
    const data = await getUserList();
    if (data) {
      setData(loadDataReducer(data)());
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const setDayHabitValue: SetDayValue = (dateIndex, habitIndex, valueId) => {
    if (data === null) return;
    const { dates, habits } = data;
    setDayValueServer(dates[dateIndex].date, habits[habitIndex].habit.id, valueId)
    setData(setDayHabitValueReducer(data)(dateIndex, habitIndex, valueId));
  }

  const getDayHabitValue: GetDayHabitValue = (dateIndex, habitIndex) => {
    if (data === null) return null;
    return getDayHabitValueSelector(data)(dateIndex, habitIndex);
  }

  const deleteHabit: DeleteHabit = (index) => {
    if (data === null) return null;
    const { habits } = data;
    const newHabits = [...habits];
    deleteHabitServer(newHabits[index].habit.id);
    setData(deleteHabitReducer(data)(index));
  }

  const switchHabits: SwitchHabits = (isDown, index) => {
    if (data === null) return null;
    const { habits } = data;
    const otherIndex = index + (isDown ? 1 : -1);
    const ids = habits.map(h => h.habit.id);
    ids[index] = habits[otherIndex].habit.id;
    ids[otherIndex] = habits[index].habit.id;
    setData(switchHabitsReducer(data)(isDown, index));
    reorderHabitsServer(ids);
  }

  const deleteValue: DeleteValue = (habitIndex, valueIndex) => {
    if (data === null) return null;
    const { habits } = data;
    const newHabits = [...habits];
    const newValues = [...newHabits[habitIndex].values];
    newValues.splice(valueIndex, 1);
    newHabits[habitIndex].values = newValues;
    setData({ ...data, habits: newHabits });
  }

  const switchValues: SwitchValues = (isDown, habitIndex, valueIndex) => {
    if (data === null) return null;
    const { habits } = data;
    const otherIndex = valueIndex + (isDown ? 1 : -1);
    const values = habits[habitIndex].values;
    const ids = values.map(v => v.id);
    ids[valueIndex] = values[otherIndex].id;
    ids[otherIndex] = values[valueIndex].id;
    setData(switchValuesReducer(data)(isDown, habitIndex, valueIndex));
    reorderValuesServer(ids);
  }

  const updateValue: UpdateValue = (habitIndex, valueIndex, newValueValues) => {
    if (data === null) return;
    setData(updateValueReducer(data)(habitIndex, valueIndex, newValueValues));
  }

  return (
    <view>
      <view className='Background' />
      <view className='App'>
        <view className='Container'>
          <MemoryRouter>
            <Routes>
              <Route path="/" element={<Main getDayHabitValue={getDayHabitValue} data={data} />} />
              <Route path="/day/:date" element={
                <Day
                  getDayHabitValue={getDayHabitValue}
                  setDayHabitValue={setDayHabitValue}
                  data={data}
                />
              } />
              <Route path="/day/:date/habits" element={
                <Habits
                  deleteHabit={deleteHabit}
                  switchHabits={switchHabits}
                  getDayHabitValue={getDayHabitValue}
                  setDayHabitValue={setDayHabitValue}
                  data={data}
                />
              } />
              <Route path="/day/:date/habits/:habit" element={
                <Values
                  deleteValue={deleteValue}
                  switchValues={switchValues}
                  updateValue={updateValue}
                  data={data}
                />
              } />
            </Routes>
          </MemoryRouter>
        </view>
      </view>
    </view>
  )
}
