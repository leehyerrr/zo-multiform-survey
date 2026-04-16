import Question from '../../models/question'
import type { QuestionType } from '../../types/app'
import Input from '../common/Input'
import OptionEditor from './OptionEditor'

interface QuestionBodyEditorProps {
  question: Question
}

function QuestionBodyEditor({ question }: QuestionBodyEditorProps) {
  switch (question.type) {
    case 'shortText':
    case 'longText':
    case 'date':
    case 'time':
      return (
        <div className="mt-25">
          <Input disabled className="disabled:bg-gray-100" />
        </div>
      )
    case 'multipleChoice':
    case 'checkbox':
    case 'dropdown':
      return (
        <div className="mt-25">
          <OptionEditor question={question} />
        </div>
      )
    default:
      return null
  }
}

export default QuestionBodyEditor
