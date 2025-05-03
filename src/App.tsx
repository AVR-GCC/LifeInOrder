import { useEffect, useState } from '@lynx-js/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import moment from 'moment';

import './App.css';
import Main from './screens/main.jsx';
import Day from './screens/day/index.jsx';
import { getUserList, setDayValueServer } from './server/index.jsx';
import type { GetDayHabitValue, MainProps, SetDayValue } from './types/index.jsx';

export const UNFILLED_COLOR = '#555555';
const SPARE_DATES = 50;
const dateFormat = 'YYYY-MM-DD';

export const App = () => {
  const [data, setData] = useState<MainProps>(null);
  console.log('data', data);

  const loadData = async () => {
    const data = await getUserList();
    if (data) {
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

      setData({ dates: [...datesFilled, ...newDates], habits });
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const setDayHabitValue: SetDayValue = (dateIndex, habitIndex, valueId) => {
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
    setDayValueServer(newDates[dateIndex].date, habitObj.habit.id, valueId)
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
