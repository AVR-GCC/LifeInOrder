import { useNavigate, useParams } from 'react-router';
import '../../styles/Day.css';
import LeftArrow from '../../assets/arrow-left.png';
import ValueCard from './valueCard.jsx';
import type { ValuesProps } from '../../types/index.jsx';

export const Values = (props: ValuesProps) => {
  const { date, habit } = useParams();
  if (props.data === null || date === undefined || habit === undefined) return <text>Loading...</text>;
  const dateIndex = parseInt(date, 10);
  const habitIndex = parseInt(habit, 10);
  const { data: { habits }, switchValues, deleteValue } = props;
  const nav = useNavigate();

  return (
    <view>
      <view className='Buffer' />
      <text className='DayTitle'>{habits[habitIndex].habit.name}</text>
      <view className='DayContainer'>
        <view
          className='BackArrowContainer'
          bindtap={() => nav(`/day/${dateIndex}/habits`)}
        >
          <image
            className='BackArrow'
            src={LeftArrow}
          />
        </view>
        <scroll-view className='DayContainer'>
          {habits[habitIndex].values.map((v, index) => {
            return <ValueCard
              habit={habits[habitIndex]}
              habitIndex={habitIndex}
              value={v}
              valueIndex={index}
              switchValues={switchValues}
              deleteValue={deleteValue}
            />;
          })}
          <view className='ClearBuffer' />
        </scroll-view>
      </view>
    </view>
  )
}

export default Values;
