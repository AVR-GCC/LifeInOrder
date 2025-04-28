import { useEffect, useState } from '@lynx-js/react'
import { useNavigate } from 'react-router';
import moment from 'moment'
import '../styles/Main.css'
import { type MainProps, type Date, UNFILLED_COLOR, type GetDayHabitValue } from '../App.jsx';

const SPARE_DATES = 50;

export const Main = (props: { data: MainProps, getDayHabitValue: GetDayHabitValue }) => {
  if (props.data === null) return <text>Loading...</text>;
  const { data: { dates, habits }, getDayHabitValue } = props;
  const nav = useNavigate();
  const [days, setDays] = useState<Date[]>([]);
  const [dayHeightPixels, _setDayHeightPixels] = useState(20);

  useEffect(() => {
      const datesEmpty = !dates.length;
      const currentDate = datesEmpty ? moment() : moment(dates[dates.length - 1].date).add(1, 'd');
      const newDates = new Array(SPARE_DATES);
      for (let i = 0; i < SPARE_DATES; i++) {
        newDates[i] = { date: currentDate.format('YYYY-MM-DD'), values: {} };
        currentDate.add(1, 'd');
      }
      setDays([...dates, ...newDates]);
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
      <view className='Buffer' />
      <view className='TopBar'>
       {habits.map(h => (
          <text className='ColumnTitle' style={{ flex: h.habit.weight.toString() }}>
            {h.habit.name}
          </text>
       ))}
      </view>
      <scroll-view style={{ height: '100vh' }}>
        <view style={{ display: 'flex' }}>
          <view className='LeftBar'>
           {days.map((_, dayIndex) => (
             <view bindtap={() => nav(`/day/${dayIndex}`)} className='DayMarker' style={{ height: dayHeight }}></view>
           ))}
          </view>
          <view className='Checklist'>
            {habits.map((h, habitIndex) => (
              <view className='Column' style={{ flex: h.habit.weight.toString() }}>
                {days.map((day, dayIndex) => {
                  if (Object.keys(day.values).length === 0) return <view className='Square' style={{ background: UNFILLED_COLOR, height: dayHeight }} />
                  const valueObj = getDayHabitValue(dayIndex, habitIndex)
                  const background = valueObj?.color || UNFILLED_COLOR;
                  return <view className='Square' style={{ background, height: dayHeight }} />;
                })}
              </view>
            ))}
          </view>
        </view>
      </scroll-view>
    </view>
  )
}

export default Main;
