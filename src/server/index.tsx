import axios from 'axios';
import type { MainProps, SetDayValueServer, Value } from '../types/index.jsx';

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

const debounce = (func: (args: any) => any) => {
  let deb: ReturnType<typeof setTimeout> | null = null;
  return (args: any) => {
    if (deb) clearTimeout(deb);
    deb = setTimeout(() => func(args), 1000);
  }
}

export const setDayValueServer: SetDayValueServer = (() => {
  const debounces: { [key: string]: ReturnType<typeof setTimeout> } = {};
  const func: SetDayValueServer = async (date, habitId, valueId) => {
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
    return fetch(`${baseUrl}/day_values`, config);
  }
  const debounced: SetDayValueServer = (date, habitId, valueId) => {
    const key = `${date}-${habitId}`;
    if (debounces[key]) clearTimeout(debounces[key]);
    debounces[key] = setTimeout(() => func(date, habitId, valueId), 1000);
  };
  return debounced;
})();

export const deleteHabitServer = async (id: string) => {
    const route = `${baseUrl}/user_habits/${parseInt(id, 10)}`;
    const config = { method: 'DELETE' };
    const res = await fetch(route, config);
    return res.ok;
}

export const reorderGeneralServerUndebounced = async (route: string, ids: string[]) => {
    const body = JSON.stringify({
      ordered_ids: ids
    });
    const config = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    };
    const res = await fetch(route, config);
    return res.ok;
}

export const reorderHabitsServerUndebounced = async (ids: string[]) => {
    const route = `${baseUrl}/user_habits/reorder`;
    return reorderGeneralServerUndebounced(route, ids); 
}

export const reorderValuesServerUndebounced = async (ids: string[]) => {
    const route = `${baseUrl}/habit_values/reorder`;
    return reorderGeneralServerUndebounced(route, ids); 
}

export const reorderHabitsServer = debounce(reorderHabitsServerUndebounced);

export const reorderValuesServer = debounce(reorderValuesServerUndebounced);

export const updateValueServer = async (newValue: Value) => {
    const route = `${baseUrl}/habit_values`;
    const body = JSON.stringify(newValue);
    const config = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body
    };
    const res = await fetch(route, config);
    return res.ok;
}
