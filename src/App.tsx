import { useEffect, useState } from '@lynx-js/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import axios from 'axios'
import moment from 'moment'

import './App.css';
import Main from './screens/main.jsx';
import Day from './screens/day/index.jsx';

export type Value = {
  id: number,
  label: string,
  sequence: number,
  habit_id: number,
  color: string,
  created_at: string
};

export type Habit = {
  habit: {
    id: string,
    name: string,
    weight: number,
    sequence: number,
    habit_type: string,
  }
  values: Value[]
  values_hashmap: { [key: string]: number }
};

export type Date = {
  date: string,
  values: { [key: string]: number }
};

export type MainProps = {
  dates: Date[],
  habits: Habit[]
} | null;

export type SetDayHabitValue = (dayIndex: number, habitIndex: number, valueId: number) => void;

export type GetDayHabitValue = (dayIndex: number, habitIndex: number) => Value | null;

export const UNFILLED_COLOR = '#555555';
const SPARE_DATES = 50;

export const App = () => {
  const [data, setData] = useState<MainProps>(null);
  console.log('data', data);

  const loadData = async () => {
    const res: { data: MainProps, status: number } = await axios.get('http://10.0.0.8:8080/users/1/list');
    if (res.data) {
      const { dates, habits } = res.data;
      const datesEmpty = !dates.length;
      const currentDate = datesEmpty ? moment() : moment(dates[dates.length - 1].date).add(1, 'd');
      const newDates = new Array(SPARE_DATES);
      for (let i = 0; i < SPARE_DATES; i++) {
        newDates[i] = { date: currentDate.format('YYYY-MM-DD'), values: {} };
        currentDate.add(1, 'd');
      }

      setData({ dates: [...dates, ...newDates], habits });
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const setDayHabitValue: SetDayHabitValue = (dateIndex, habitIndex, valueId) => {
    if (data === null) return;
    const { dates, habits } = data;
    const newDates = [...dates];
    const habitObj = habits[habitIndex];
    if (!newDates[dateIndex]) {
      for (let i = newDates.length; i <= dateIndex; i++) {
        newDates.push({ date: moment(newDates[i - 1].date).add(1, 'd').format('YYYY-MM-DD'), values: {} });
      }
    }
    newDates[dateIndex].values[habitObj.habit.id] = valueId;
    setData({ ...data, dates: newDates });
  }

  const getDayHabitValue: GetDayHabitValue = (dateIndex, habitIndex) => {
    if (data === null) return null;
    const { dates, habits } = data;
    const day = dates[dateIndex];
    const habitObj = habits[habitIndex];
    const dayValue = day.values[habitObj.habit.id];
    const valueIndex = habitObj.values_hashmap[dayValue];
    const valueObj = habitObj.values[valueIndex];
    return valueObj;
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
                <Day getDayHabitValue={getDayHabitValue} setDayHabitValue={setDayHabitValue} data={data} />
              } />
            </Routes>
          </MemoryRouter>
        </view>
      </view>
    </view>
  )
}
