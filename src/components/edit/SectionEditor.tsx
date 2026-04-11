import { observer } from 'mobx-react-lite'
import QuestionEditor from './QuestionEditor'
import type Section from '../../models/section'
import SectionTitleEditor from './SectionTitleEditor'

interface Props {
  section: Section
}

const SectionEditor = observer(function SectionEditor({ section }: Props) {
  return (
    <div className="*:mb-24">
      <SectionTitleEditor section={section} capTitle="2개중 1섹션" />
      {section.questions.map((question) => (
        <QuestionEditor key={question.id} question={question} />
      ))}
    </div>
  )
})

export default SectionEditor
