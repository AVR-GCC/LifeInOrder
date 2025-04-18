import { useLynxGlobalEventListener, useCallback, useEffect, useState, useRef } from '@lynx-js/react'
import axios from 'axios'
import '../styles/Main.css'

export const Main = () => {
  const [days, setDays] = useState([]);
  const [columns, setColumns] = useState([]);
  const [dayHeightPixels, setDayHeightPixels] = useState(100);
  const [loading, setLoading] = useState(true);
  
  //const onTap = useCallback((e) => {
  //  'background only'
  //  const newHeight = e.touches[0].y / 3;
  //  console.log('newHeight', newHeight);
  //  console.log('e', e);
  //
  //  setDayHeightPixels(newHeight);
  //}, [])
  
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('http://10.0.0.8:8080/users/1/habit_colors');
        if (res.data.length) {
          const days = res.data[0].day_colors.map(({ date }) => date);
          setDays(days);
          setColumns(res.data);
        }
      } catch (e) {
        console.log('get failed', e);
      }
    }
    getData();
  }, [])

  const dayHeight = `${dayHeightPixels}px`;

      //bindtouchmove={onTap}
  return (
    <view
      style={{ height: '100vh' }}
    >
      <view className='TopBar'>
       {columns.map(c => (
          <text className='ColumnTitle' style={{ flex: c.weight.toString() }}>
            {c.habit_name}
          </text>
        ))}
      </view>
      <view style={{ display: 'flex' }}>
        <view className='LeftBar'>
         {days.map(() => (
           <view className='DayMarker' style={{ height: dayHeight }}></view>
         ))}
        </view>
        <view className='Checklist'>
          {columns.map(c => (
            <view className='Column' style={{ flex: c.weight.toString() }}>
              {c.day_colors.map(day_color => <view className='Square' style={{ background: day_color.color, height: dayHeight }} />)}
            </view>
          ))}
        </view>
      </view>
    </view>
  )
}

export default Main;
