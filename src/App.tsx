import { useEffect, useState } from '@lynx-js/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import axios from 'axios'

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

export const UNFILLED_COLOR = '#555555';

export const App = () => {
  const [data, setData] = useState<MainProps>(null);

  const loadData = async () => {
    const res: { data: MainProps, status: number } = await axios.get('http://10.0.0.8:8080/users/1/list');
      console.log('res', res);
    if (res.status === 200) {
      console.log('res.data', res.data);
      setData(res.data);
    }
  }

  useEffect(() => {
    console.log('Effect');
    loadData();
  }, []);

  return (
    <view>
      <view className='Background' />
      <view className='App'>
        <view className='Container'>
          <MemoryRouter>
            <Routes>
              <Route path="/" element={<Main data={data} />} />
              <Route path="/day/:date" element={<Day {...data} />} />
            </Routes>
          </MemoryRouter>
        </view>
      </view>
    </view>
  )
}
