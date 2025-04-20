import { useLynxGlobalEventListener, useCallback, useEffect, useState, useRef } from '@lynx-js/react'
import { useNavigate } from 'react-router';
import axios from 'axios'
import '../styles/Day.css'

export const Day = () => {
  const nav = useNavigate();
  
  return (
    <view bindtap={() => nav('/')}>
      <text style={{ color: '#000000' }}>Dayyy</text>
    </view>
  )
}

export default Day;
