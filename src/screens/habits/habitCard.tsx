import '../../styles/HabitCard.css'
import Edit from '../../assets/edit.png';
import Delete from '../../assets/delete.png';
import type { HabitCardProps } from '../../types/index.jsx';
import VerticalChevrons from '../../components/verticalChevrons.jsx';

export const HabitCard = ({ habit, index, totalHabits, switchHabits, deleteHabit, editHabit }: HabitCardProps) => {
  return (
    <view className="HabitCard">
      <view className="LeftSide">
        <text className="HabitName">{habit.habit.name}</text>
        <scroll-view scroll-orientation="horizontal" className="ValueColors">
          {habit.values.map(value => (
            <view className="ValueColor" style={{ background: value.color }} />
          ))}
        </scroll-view>
      </view>
      <view className="RightSide">
        <view className="ButtonHolder" style={{ paddingBottom: '6px', paddingRight: '12px' }}>
          <VerticalChevrons
            dark={true}
            onTap={(isDown) => switchHabits(isDown, index)}
            upDisabled={index === 0}
            downDisabled={index === totalHabits - 1}
          />
        </view>
        <view className="ButtonHolder" bindtap={editHabit}>
          <image
            className='Edit'
            src={Edit}
          />
        </view>
        <view className="ButtonHolder" bindtap={() => deleteHabit(index)}>
          <image
            className='Delete'
            src={Delete}
          />
        </view>
      </view>
    </view>
  )
}

export default HabitCard;
