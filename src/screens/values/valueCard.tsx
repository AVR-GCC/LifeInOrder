import '../../styles/ValueCard.css'
import Delete from '../../assets/delete.png';
import type { ValueCardProps } from '../../types/index.jsx';
import VerticalChevrons from '../../components/verticalChevrons.jsx';

export const ValueCard = ({ habit, habitIndex, value, valueIndex, switchValues, deleteValue }: ValueCardProps) => {
  return (
    <view className="HabitCard">
      <view className="LeftSide">
        <text className="HabitName">{value.label}</text>
      </view>
      <view className="RightSide">
        <view className="ButtonHolder" style={{ paddingBottom: '6px', paddingRight: '12px' }}>
          <VerticalChevrons
            dark={true}
            onTap={(isDown) => switchValues(isDown, habitIndex, valueIndex)}
            upDisabled={valueIndex === 0}
            downDisabled={valueIndex === habit.values.length - 1}
          />
        </view>
        <view className="ButtonHolder">
          <view className="ValueColor" style={{ background: value.color }} />
        </view>
        <view className="ButtonHolder" bindtap={() => deleteValue(habitIndex, valueIndex)}>
          <image
            className='Delete'
            src={Delete}
          />
        </view>
      </view>
    </view>
  )
}

export default ValueCard;
