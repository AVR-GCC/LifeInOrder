import { useLynxGlobalEventListener, useCallback, useEffect, useState, useRef } from '@lynx-js/react'
import { useNavigate, useParams } from 'react-router';
import moment from 'moment'
import '../../styles/Day.css';
import LeftArrow from '../../assets/arrow-left.png';
import Settings2 from '../../assets/settings2.png';
import HabitButton from './habitButton.jsx';
import type { GetDayHabitValue, MainProps, SetDayValue } from '../../types/index.jsx';
import VerticalChevrons from '../../components/verticalChevrons.jsx';

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const Day = (props: { data: MainProps, getDayHabitValue: GetDayHabitValue,  setDayHabitValue: SetDayValue }) => {
  const { date } = useParams();
  if (props.data === null || date === undefined) return <text>Loading...</text>;
  const dateIndex = parseInt(date, 10);
  const { data: { dates, habits }, setDayHabitValue, getDayHabitValue } = props;
  const nav = useNavigate();

  return (
    <view>
      <view className='Buffer' />
      <text className='DayTitle'>{dayNames[moment(dates[dateIndex].date).day()]}, {moment(dates[dateIndex].date).format('MMMM DD, YYYY')}</text>
      <view className='DayContainer'>
        <view className='VerticalChevronsContainer'>
          <VerticalChevrons
            onTap={(isDown) => nav(`/day/${dateIndex + (isDown ? 1 : -1)}`)}
            upDisabled={dateIndex === 0}
            downDisabled={dateIndex === dates.length - 1}
          />
        </view>
        <view
          className='SettingsButtonContainer'
          bindtap={() => nav(`/day/${dateIndex}/habits`)}
        >
          <image
            className='SettingsButton'
            src={Settings2}
          />
        </view>
        <view
          className='BackArrowContainer'
          bindtap={() => nav('/')}
        >
          <image
            className='BackArrow'
            src={LeftArrow}
          />
        </view>
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
          <view className='ClearBuffer' />
        </scroll-view>
      </view>
    </view>
  )
}

export default Day;
