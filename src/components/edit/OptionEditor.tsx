import { useState, type ReactNode } from 'react'
import type { QuestionType } from '../../types/app'
import Input from '../common/Input'
import RadioIcon from '../../assets/icons/radio_button_unchecked.svg?react'
import CheckboxIcon from '../../assets/icons/check_box_outline_blank.svg?react'
import AddCircle from '../../assets/icons/add_circle.svg?react'

interface OptionEditorProps {
  type: QuestionType
}

function OptionEditor({ type }: OptionEditorProps) {
  const [options, setOptions] = useState<string[]>([''])
  return (
    <div>
      {options.map((option, index) => (
        <div key={index} className="flex items-center">
          {icons[type]}
          <Input
            value={option}
            onChange={(e) => {
              const newOptions = [...options]
              newOptions[index] = e.target.value
              setOptions(newOptions)
            }}
            className="ml-10"
          />
        </div>
      ))}
      <div className="flex items-center gap-5 my-20">
        <AddCircle />
        <button
          onClick={() => {
            setOptions((prev) => [...prev, ''])
          }}
          className="hover:cursor-pointer"
        >
          옵션추가
        </button>
      </div>
    </div>
  )
}

const icons: Partial<Record<QuestionType, ReactNode>> = {
  multipleChoice: <RadioIcon />,
  checkbox: <CheckboxIcon />,
  dropdown: <RadioIcon />,
}

export default OptionEditor
