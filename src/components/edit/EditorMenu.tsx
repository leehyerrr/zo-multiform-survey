import { observer } from 'mobx-react-lite'
import PlusIcon from '../../assets/icons/add_circle.svg?react'
import SectionPlusIcon from '../../assets/icons/view_comfy.svg?react'
import { useSurveyStore } from '../../store'
import classNames from 'classnames'

const EditorMenu = observer(function EditorMenu({ className }: Cn) {
  const surveyStore = useSurveyStore()
  return (
    <div
      className={classNames(
        'bg-white rounded-10 px-13 py-26 flex flex-col gap-y-20 shadow-sm',
        className,
      )}
    >
      <button onClick={surveyStore.addQuestion}>
        <PlusIcon />
      </button>
      <button onClick={surveyStore.addSection}>
        <SectionPlusIcon />
      </button>
    </div>
  )
})

export default EditorMenu
