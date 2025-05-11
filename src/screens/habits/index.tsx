import { useNavigate, useParams } from 'react-router';
import '../../styles/Day.css';
import LeftArrow from '../../assets/arrow-left.png';
import type { HabitsProps } from '../../types/index.jsx';
import HabitCard from './habitCard.jsx';

export const Habits = (props: HabitsProps) => {
  const { date } = useParams();
  if (props.data === null || date === undefined) return <text>Loading...</text>;
  const dateIndex = parseInt(date, 10);
  const { data: { habits }, switchHabits, deleteHabit } = props;
  const nav = useNavigate();

  return (
    <view>
      <view className='Buffer' />
      <text className='DayTitle'>Habits</text>
      <view className='DayContainer'>
        <view
          className='BackArrowContainer'
          bindtap={() => nav(`/day/${dateIndex}`)}
        >
          <image
            className='BackArrow'
            src={LeftArrow}
          />
        </view>
        <scroll-view className='DayContainer'>
          {habits.map((h, index) => {
            return <HabitCard
              habit={h}
              index={index}
              totalHabits={habits.length}
              switchHabits={switchHabits}
              deleteHabit={deleteHabit}
              editHabit={() => nav(`/day/${dateIndex}/habits/${index}`)}
            />;
          })}
          <view className='ClearBuffer' />
        </scroll-view>
      </view>
    </view>
  )
}

export default Habits;
