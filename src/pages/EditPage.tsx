import { toJS } from 'mobx'
import SectionListEditor from '../components/edit/SectionListEditor'
import { useSurveyStore } from '../store'
import callApi from '../utils/api'
import { useEffect } from 'react'
import { useParams } from 'react-router'

function EditPage() {
  const surveyStore = useSurveyStore()
  const { surveyId } = useParams<{ surveyId: string }>()

  useEffect(() => {
    const id = parseInt(surveyId ?? '', 10)
    if (id) {
      surveyStore.fetchSurvey(id)
    }
  }, [surveyId, surveyStore])

  const handleClick = () => {
    callApi(`/surveys/${surveyId}`, {
      method: 'PUT',
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

export default EditPage
