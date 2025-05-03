import axios from 'axios';
import type { MainProps, SetDayValueServer } from '../types/index.jsx';

const baseUrl = 'http://10.0.0.8:8080';

export const getUserList = async () => {
    const route = `${baseUrl}/users/1/list`;
    console.log('route', route);
    const res: { data: MainProps } = await axios.get(route);
    if (res.data) {
      const { dates, habits } = res.data;
      return { dates, habits };
    }
    return null;
}

export const setDayValueServer: SetDayValueServer = async (date, habitId, valueId) => {
  const body = JSON.stringify({
    value_id: valueId,
    habit_id: habitId,
    date,
    text: null,
    number: null
  });
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body
  };
  return fetch('http://10.0.0.8:8080/day_values', config);
}
