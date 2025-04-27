import '../../styles/Day.css'
import { UNFILLED_COLOR, type Value } from '../../App.jsx';

type HabitButtonProps = {
  title: string,
  value: Value,
  onTap: () => void
}

export const HabitButton = ({ title, value, onTap }: HabitButtonProps) => {
  return (
    <view className="HabitButton" bindtap={() => onTap()} style={{ borderColor: value?.color || UNFILLED_COLOR }}>
      <text style={{ flex: 1, color: '#222222', fontWeight: '500' }}>{title}</text>
      <text style={{ flex: 2, color: '#444444' }}>{value?.label || 'Choose value'}</text>
    </view>
  )
}

export default HabitButton;
