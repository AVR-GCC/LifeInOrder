import { useEffect, useState } from '@lynx-js/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import axios from 'axios'

import './App.css';
import Main from './screens/main.jsx';
import Day from './screens/day.jsx';

export type Value = {
  id: number,
  label: string,
  sequence: number,
  habit_id: number,
  color: string,
  created_at: string
};

export type Habit = {
  id: string,
  name: string,
  weight: number,
  sequence: number,
  habit_type: string,
  values: { [key: string]: Value }
};

export type MainProps = {
  dates?: { [key: string]: { [key: string]: number } },
  habits?: { [key: string]: Habit }
}

export const App = () => {
  const [data, setData] = useState<MainProps | null>(null);

  const loadData = async () => {
    const res: { data: MainProps, status: number } = await axios.get('http://10.0.0.8:8080/users/1/list');
    if (res.status === 200) {
      setData(res.data);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <view>
      <view className='Background' />
      <view className='App'>
        <view className='Container'>
          <view className='Buffer' />
          <MemoryRouter>
            <Routes>
              <Route path="/" element={<Main dates={data?.dates} habits={data?.habits} />} />
              <Route path="/day/:date" element={<Day {...data} />} />
            </Routes>
          </MemoryRouter>,
        </view>
      </view>
    </view>
  )
}
