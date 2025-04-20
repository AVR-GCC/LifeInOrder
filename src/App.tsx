import { useCallback, useEffect, useState } from '@lynx-js/react'
import { MemoryRouter, Routes, Route } from 'react-router';

import './App.css'
import arrow from './assets/arrow.png'
import lynxLogo from './assets/lynx-logo.png'
import reactLynxLogo from './assets/react-logo.png'
import Main from './screens/main.tsx'
import Day from './screens/day.tsx'

export const App = () => {
  const [alterLogo, setAlterLogo] = useState(false)
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    console.info('Hello, ReactLynx', counter)
  }, [])
  const onTap = useCallback(() => {
    'background only'
    setAlterLogo(!alterLogo)
    setCounter(counter + 1)
  }, [alterLogo])

  return (
    <view>
      <view className='Background' />
      <view className='App'>
        <view className='Container'>
          <view className='Buffer' />
          <MemoryRouter>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/day/:date" element={<Day />} />
            </Routes>
          </MemoryRouter>,
        </view>
      </view>
    </view>
  )
}
      /*<view className='Banner'>
          <view className='Logo' bindtap={onTap}>
            {alterLogo
              ? <image src={reactLynxLogo} className='Logo--react' />
              : <image src={lynxLogo} className='Logo--lynx' />}
          </view>
          <text className='Title'>React</text>
          <text className='Subtitle'>on Lynx</text>
        </view>
        <view className='Content'>
          <image src={arrow} className='Arrow' />
          <text className='Description'>Tap the logo {counter} have fun!</text>
          <text className='Hint'>
            Edit<text style={{ fontStyle: 'italic' }}>{' src/App.tsx '}</text>
            to see updates!
          </text>
        </view>
        <view style={{ flex: 1 }}></view>*/
