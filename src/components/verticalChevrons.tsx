import '../styles/VerticalChevrons.css'
import ChevronUp from '../assets/chevron-up.png';
import ChevronUpDark from '../assets/chevron-up-dark.png';
import type { VerticalChevronsProps } from '../types/index.jsx';

export const VerticalChevrons = ({ dark, onTap, upDisabled, downDisabled }: VerticalChevronsProps) => {
  const chevron = dark ? ChevronUpDark : ChevronUp;
  return (
    <view className="VerticalChevronsHolder">
      <view
        className='ChevronUpHolder'
        bindtap={() => {
          if (!upDisabled) onTap(false)
        }}
      >
        <image
          className='Chevron'
          src={chevron}
          style={{ opacity: upDisabled ? 0.3 : 1 }}
        />
      </view>
      <view
        className='ChevronDownHolder'
        bindtap={() => {
          if (!downDisabled) onTap(true)
        }}
      >
        <image
          className='Chevron'
          src={chevron}
          style={{ opacity: downDisabled ? 0.3 : 1, transform: 'rotate(180deg)' }}
        />
      </view>
    </view>
  )
}

export default VerticalChevrons;
