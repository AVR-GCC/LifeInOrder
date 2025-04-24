import { useEffect, useState } from '@lynx-js/react'
import { useNavigate } from 'react-router';
import moment from 'moment'
import '../styles/Main.css'
import type { MainProps, Habit } from '../App.jsx';

const SPARE_DATES = 50;
const UNFILLED_COLOR = '#555555';

export const Main = ({ dates, habits }: MainProps) => {
  const nav = useNavigate();
  const [days, setDays] = useState<string[]>([]);
  const [columns, setColumns] = useState<Habit[]>([]);
  const [dayHeightPixels, _setDayHeightPixels] = useState(20);

  useEffect(() => {
    if (habits !== undefined) {
      const columnIds = Object.keys(habits);
      const newColumns = new Array(columnIds.length);
      for (let i = 0; i < columnIds.length; i++) {
        newColumns[i] = habits[columnIds[i]];
        newColumns[i].id = parseInt(columnIds[i], 10);
      }
      const sortedColumns = newColumns.sort((a, b) => a.sequence > b.sequence ? 1 : -1);
      setColumns(sortedColumns);
    }
  }, [habits]);

  useEffect(() => {
    if (dates !== undefined) {
      const existingDays = Object.keys(dates);
      const sortedExistingDays = existingDays.sort((a, b) => a > b ? 1 : -1);
      const datesEmpty = !sortedExistingDays.length;
      const currentDate = datesEmpty ? moment() : moment(sortedExistingDays[sortedExistingDays.length - 1]).add(1, 'd');
      const newDates = new Array(SPARE_DATES);
      for (let i = 0; i < SPARE_DATES - 1; i++) {
        newDates[i] = currentDate.format('YYYY-MM-DD');
        currentDate.add(1, 'd');
      }
      setDays([...existingDays, ...newDates]);
    }
  }, [dates]);

  if (dates === undefined) return <text>Hi</text>

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
            {c.name}
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
                {days.map((day) => (
                  <view
                    className='Square'
                    style={{
                      background: c.values[dates?.[day]?.[c.id]?.toString()]?.color || UNFILLED_COLOR,
                      height: dayHeight
                    }}
                  />
                ))}
              </view>
            ))}
          </view>
        </view>
      </scroll-view>
    </view>
  )
}

export default Main;
