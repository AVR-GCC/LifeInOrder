import { useLynxGlobalEventListener, useCallback, useEffect, useState, useRef } from '@lynx-js/react'
import { useNavigate, useParams } from 'react-router';
import '../../styles/Day.css'
import type { SetDayHabitValue, GetDayHabitValue, MainProps } from '../../App.jsx';
import HabitButton from './habitButton.jsx';

export const Day = (props: { data: MainProps, getDayHabitValue: GetDayHabitValue,  setDayHabitValue: SetDayHabitValue }) => {
  const { date } = useParams();
  if (props.data === null || date === undefined) return <text>Loading...</text>;
  const dateIndex = parseInt(date, 10);
  const { data: { habits }, setDayHabitValue, getDayHabitValue } = props;
  const nav = useNavigate();

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
          {habits.map((h, habitIndex) => {
            const value = getDayHabitValue(dateIndex, habitIndex);
            if (value === null) return <text>Value not found</text>;
            return (
              <HabitButton
                title={h.habit.name}
                value={value}
                onTap={() => {
                  const currentIndex = h.values_hashmap[value?.id?.toString()];
                  const nextIndexRaw = currentIndex === undefined ? 0 : currentIndex + 1;
                  const nextIndex = nextIndexRaw === h.values.length ? 0 : nextIndexRaw;
                  const nextValue = h.values[nextIndex];
                  const nextValueId = nextValue.id;
                  setDayHabitValue(dateIndex, habitIndex, nextValueId);
                }}
              />
            );
          })}
        </scroll-view>
      </view>
    </view>
  )
}

export default Day;
