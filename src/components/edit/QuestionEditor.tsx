import Input from '../common/Input'
import Panel, { PanelBody, PanelFooter, PanelHeader } from '../common/Panel'

import QuestionBodyEditor from './QuestionBodyEditor'
import type Question from '../../models/question'
import { observer } from 'mobx-react-lite'
import QuestionTypeEditor from './QuestionTypeEditor'
import CopyIcon from '../../assets/icons/filter_none.svg?react'
import DeleteIcon from '../../assets/icons/delete.svg?react'
import Divider from '../common/Divider'
import Switch from '../common/Switch'

interface Props {
  question: Question
  onCopy: (id: number) => void
  onDelete: (id: number) => void
}

const QuestionEditor = observer(function QuestionEditor({ question, onCopy, onDelete }: Props) {
  return (
    <Panel className="border-l-transparent focus-within:border-l-main border-l-2">
      <PanelHeader className="flex">
        <Input
          className="flex-1 mr-30 border-b border-b-gray-200"
          value={question.title}
          onChange={(e) => question.setTitle(e.currentTarget.value)}
        />
        <QuestionTypeEditor type={question.type} onChange={question.setType} />
      </PanelHeader>
      <PanelBody>
        <QuestionBodyEditor question={question} />
      </PanelBody>
      <PanelFooter className="flex justify-end gap-x-20 h-22 mt-20">
        <button onClick={() => onCopy(question.id)}>
          <CopyIcon />
        </button>
        <button onClick={() => onDelete(question.id)}>
          <DeleteIcon />
        </button>
        <Divider direction="vertical" />
        <div className="flex items-center gap-5">
          <span>필수</span>
          <Switch
            id={`${question.id}_switch`}
            checked={question.required}
            onChange={question.setRequired}
          />
        </div>
      </PanelFooter>
    </Panel>
  )
})

export default QuestionEditor
