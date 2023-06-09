import { ChangeEvent, useState, useRef } from 'react'

interface RangeSliderNumberProps {
  updateValue: (value: number) => void
  defaultValue: number
  maxValue: number
}

const RangeSliderNumber = ({ updateValue, defaultValue = 30, maxValue = 70 }: RangeSliderNumberProps) => {
  const [value, setValue] = useState(defaultValue)
  const sliderRef = useRef<HTMLInputElement>(null)
  const numberDisplayRef = useRef<HTMLDivElement>(null)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseInt(event.target.value)
    setValue(parsedValue)
    updateValue(parsedValue)
  }

  const calculatePosition = (value: number) => {
    const rangeWidth = sliderRef.current?.clientWidth!
    const numberDisplayWidth = numberDisplayRef.current?.clientWidth!
    const position = (value / maxValue) * rangeWidth - numberDisplayWidth / 2
    return `${position}px` // Adjust the positioning as needed
  }

  return (
    <>
      <label className="label mb-4">
        <span className="label-text">Percentage for Future Rewards</span>
        <span className="label-text-alt">Default: {defaultValue}%</span>
      </label>
      <div className="relative">
        <input ref={sliderRef} type="range" className="range" min={0} max={maxValue} value={value} onChange={handleChange} />
        <div
          ref={numberDisplayRef}
          className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 px-1 bg-gray-800 text-white text-xs rounded"
          style={{ left: calculatePosition(value) }}>
          {value}
        </div>
      </div>
    </>
  )
}

export default RangeSliderNumber