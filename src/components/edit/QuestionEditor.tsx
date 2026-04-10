import type { QuestionType } from '../../types/app'
import Dropdown from '../common/Dropdown'
import Input from '../common/Input'
import Panel, { PanelBody, PanelHeader } from '../common/Panel'
import ShortTextIcon from '../../assets/icons/check_indeterminate_small.svg?react'
import LongTextIcon from '../../assets/icons/subject.svg?react'
import MultipleChoiceIcon from '../../assets/icons/checklist.svg?react'
import CheckboxIcon from '../../assets/icons/check_circle.svg?react'
import DropdownIcon from '../../assets/icons/arrow_circle_down.svg?react'
import DateIcon from '../../assets/icons/calendar_today.svg?react'
import TimeIcon from '../../assets/icons/schedule.svg?react'
import QuestionBodyEditor from './QuestionBodyEditor'
import { useState } from 'react'

function QuestionEditor() {
  const [type, setType] = useState<QuestionType>('shortText')
  return (
    <Panel>
      <PanelHeader className="flex">
        <Input className="flex-1 mr-30 border-b border-b-gray-200" />
        <Dropdown<QuestionType>
          onChange={(value) => setType(value)}
          /* prettier-ignore */
          options={[
            {label: <div><span><ShortTextIcon className='inline-block mr-5'/>단답형</span></div>, value: 'shortText'},
            {label: <div><span><LongTextIcon className='inline-block mr-5'/>장문형</span></div>, value: 'longText'},
            {label: <div><span><MultipleChoiceIcon className='inline-block mr-5'/>객관식</span></div>, value: 'multipleChoice'},
            {label: <div><span><CheckboxIcon className='inline-block mr-5'/>체크박스</span></div>, value: 'checkbox'},
            {label: <div><span><DropdownIcon className='inline-block mr-5'/>드롭다운</span></div>, value: 'dropdown'},
            {label: <div><span><DateIcon className='inline-block mr-5'/>날짜</span></div>, value: 'date'},
            {label: <div><span><TimeIcon className='inline-block mr-5'/>시간</span></div>, value: 'time'},
          ]}
        />
      </PanelHeader>
      <PanelBody>
        <QuestionBodyEditor type={type} />
      </PanelBody>
    </Panel>
  )
}

export default QuestionEditor
