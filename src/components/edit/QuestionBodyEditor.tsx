import type { QuestionType } from '../../types/app'
import Input from '../common/Input'
import OptionEditor from './OptionEditor'

interface QuestionBodyEditorProps {
  type: QuestionType
}

function QuestionBodyEditor({ type }: QuestionBodyEditorProps) {
  switch (type) {
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
          <OptionEditor type={type} />
        </div>
      )
    default:
      return null
  }
}

export default QuestionBodyEditor
