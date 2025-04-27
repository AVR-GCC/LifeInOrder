import { useLynxGlobalEventListener, useCallback, useEffect, useState, useRef } from '@lynx-js/react'
import { useNavigate, useParams } from 'react-router';
import '../../styles/Day.css'
import type { Habit, MainProps } from '../../App.jsx';
import HabitButton from './habitButton.jsx';

export const Day = ({ dates, habits }: MainProps) => {
  const nav = useNavigate();
  const { date } = useParams();
  const thisDay = dates[date];
  const [habitArray, setHabitArray] = useState<Habit[]>([]);
  
  useEffect(() => {
    if (habits !== undefined) {
      const habitIds = Object.keys(habits);
      const unsorted = new Array(habitIds.length);
      for (let i = 0; i < habitIds.length; i++) {
        unsorted[i] = habits[habitIds[i]];
        unsorted[i].id = parseInt(habitIds[i], 10);
      }
      const sortedHabits = unsorted.sort((a, b) => a.sequence > b.sequence ? 1 : -1);
      setHabitArray(sortedHabits);
    }
  }, [habits]);

  return (
    <view>
      <view className='Buffer' />
      <view style={{ display: 'flex' }}>
        <text
          bindtap={() => {
            nav('/');
          }}
          style={{ fontSize: '40px', marginLeft: '10px' }}
        >
          {'<'}
        </text>
        <scroll-view className='DayContainer'>
          {habitArray.map(h => (
            <HabitButton
              title={h?.name}
              value={h?.values?.[thisDay?.[h?.id]]}
              onTap={() => {
                const currentValue = h?.values?.[thisDay?.[h?.id]];
              }}
            />
          ))}
        </scroll-view>
      </view>
    </view>
  )
}

export default Day;
