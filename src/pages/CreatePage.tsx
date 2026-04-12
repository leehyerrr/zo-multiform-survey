import { toJS } from 'mobx'
import SectionListEditor from '../components/edit/SectionListEditor'
import { useSurveyStore } from '../store'
import callApi from '../utils/api'

function CreatePage() {
  const surveyStore = useSurveyStore()
  const handleClick = () => {
    callApi('/surveys', {
      method: 'POST',
      body: toJS({ sections: surveyStore.sections }),
    })
  }
  return (
    <>
      <div>
        <button onClick={handleClick}>보내기</button>
      </div>
      <SectionListEditor />
    </>
  )
}

export default CreatePage
