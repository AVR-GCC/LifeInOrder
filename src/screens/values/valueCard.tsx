import '../../styles/ValueCard.css'
import Delete from '../../assets/delete.png';
import type { ValueCardProps } from '../../types/index.jsx';
import VerticalChevrons from '../../components/verticalChevrons.jsx';

// Predefined color options
const colorOptions = [
  "#10b981", // Green
  "#b59e0b", // Yellow
  "#ef4444", // Red
  "#0e65e9", // Blue
  "#a3e635", // Lime
  "#f97316", // Orange
  "#8b5cf6", // Purple
  "#d946ef", // Fuchsia
  "#08a1f2", // Cyan
  "#4ade80", // Light Green
];

export const ValueCard = ({ habit, habitIndex, value, valueIndex, switchValues, deleteValue, updateValue, openPallete, palleteOpen }: ValueCardProps) => {
  return (
    <view className="ValueCard" style={palleteOpen ? {} : { paddingBottom: 0 }}>
      <view className="ValueCardMain">
        <view className="LeftSide">
          <text className="HabitName">{value.label}</text>
        </view>
        <view className="RightSide">
          <view className="ChevronSection">
            <VerticalChevrons
              dark={true}
              onTap={(isDown) => switchValues(isDown, habitIndex, valueIndex)}
              upDisabled={valueIndex === 0}
              downDisabled={valueIndex === habit.values.length - 1}
            />
          </view>
          <view className="ButtonHolder" bindtap={openPallete}>
            <view className="ValueColorCircle" style={{ margin: '3px', border: `${palleteOpen ? '#213448' : 'transparent'} solid 2px`, background: value.color }} />
          </view>
          <view className="ButtonHolder" bindtap={() => deleteValue(habitIndex, valueIndex)}>
            <image
              className='Delete'
              src={Delete}
            />
          </view>
        </view>
      </view>
      {palleteOpen && (
        <view className="ColorPallete">
          {colorOptions.map(co => (
            <view
              className="ValueColorCircle"
              style={{ border: `${co === value.color ? '#213448' : 'transparent'} solid 2px`, background: co }}
              bindtap={() => {
                updateValue(habitIndex, valueIndex, { color: co });
              }}
            />
          ))}
        </view>
      )}
    </view>
  )
}

export default ValueCard;
