import { useLynxGlobalEventListener, useCallback, useEffect, useState, useRef } from '@lynx-js/react'
import { useNavigate, useParams } from 'react-router';
import axios from 'axios'
import '../styles/Day.css'

export const Day = () => {
  const nav = useNavigate();
  const { date } = useParams();
  
  return (
    <view bindtap={() => nav('/')}>
      <text style={{ color: '#000000' }}>{date}</text>
    </view>
  )
}

export default Day;
