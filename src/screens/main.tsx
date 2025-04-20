import { useLynxGlobalEventListener, useCallback, useEffect, useState, useRef } from '@lynx-js/react'
import { useNavigate } from 'react-router';
import axios from 'axios'
import moment from 'moment'
import '../styles/Main.css'

export const Main = () => {
  const nav = useNavigate();
  const [days, setDays] = useState([]);
  const [columns, setColumns] = useState([]);
  const [dayHeightPixels, setDayHeightPixels] = useState(20);
  const [loading, setLoading] = useState(true);
  
  //const onTap = useCallback((e) => {
  //  'background only'
  //  const newHeight = e.touches[0].y / 3;
  //  console.log('newHeight', newHeight);
  //  console.log('e', e);
  //
  //  setDayHeightPixels(newHeight);
  //}, [])
  
  const getData = async () => {
    'background only'
    try {
      const res = await axios.get('http://10.0.0.8:8080/users/1/habit_colors');
      
      const existingDays = res.data[0].day_colors.map(({ date }) => date);

      const currentMoment = existingDays.length ? moment(existingDays[existingDays.length - 1]) : moment();
      if (existingDays.length) {
        currentMoment.add(1, 'd');
      }
      const emptyDays = new Array(50);
      for (let i = 0; i < 50; i++) {
        emptyDays[i] = currentMoment.format('YYYY-MM-DD');
        currentMoment.add(1, 'd');
      }
      const days = existingDays.concat(emptyDays);
      
      setDays(days);
      setColumns(res.data);
    } catch (e) {
      console.log('get failed', e);
    }
  }

  useEffect(getData, [])

  const dayHeight = `${dayHeightPixels}px`;

      //bindtouchmove={onTap}
  return (
    <view
      //bindtouchmove={() => {
      //  console.log('tapped!');
      //  getData()
      //}}
    >
      <view className='TopBar'>
       {columns.map(c => (
          <text className='ColumnTitle' style={{ flex: c.weight.toString() }}>
            {c.habit_name}
          </text>
        ))}
      </view>
      <scroll-view style={{ height: '100vh' }}>
        <view style={{ display: 'flex' }}>
          <view className='LeftBar'>
           {days.map(day => (
             <view bindtap={() => nav(`/day/${day}`)} className='DayMarker' style={{ height: dayHeight }}></view>
           ))}
          </view>
          <view className='Checklist'>
            {columns.map(c => (
              <view className='Column' style={{ flex: c.weight.toString() }}>
                {days.map((_, index) => <view className='Square' style={{ background: c.day_colors?.[index]?.color || '#555555', height: dayHeight }} />)}
              </view>
            ))}
          </view>
        </view>
      </scroll-view>
    </view>
  )
}

export default Main;
