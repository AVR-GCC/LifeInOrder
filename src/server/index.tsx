import axios from 'axios';
import type { MainProps } from '../types/index.jsx';

const baseUrl = 'http://10.0.0.8:8080';

export const getUserList = async () => {
    const res: { data: MainProps } = await axios.get(`${baseUrl}/users/1/list`);
    if (res.data) {
      const { dates, habits } = res.data;
      return { dates, habits };
    }
    return null;
}
