import { useFormContext } from 'react-hook-form'
import type Question from '../../models/question'
import Panel, { PanelBody, PanelHeader } from '../common/Panel'
import QuestionForm from './QuestionForm'
import cn from 'classnames'

interface Props {
  question: Question
}

function QuestionView({ question }: Props) {
  const {
    formState: { errors },
  } = useFormContext()
  return (
    <Panel className={cn({ 'border-red-500 border': errors[question.id] })}>
      <PanelHeader className="flex">
        <h6 className="text-16 text-gray900 font-medium">{question.title}</h6>
      </PanelHeader>
      <PanelBody>
        <QuestionForm question={question} />
        {errors[question.id] && (
          <p className="text-red-500 text-[13px] mt-10">
            {errors[question.id]?.message?.toString() || '필수 값 입니다.'}
          </p>
        )}
      </PanelBody>
    </Panel>
  )
}

export default QuestionView
