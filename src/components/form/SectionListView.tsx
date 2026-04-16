import { useRef, useState } from 'react'
import { useSurveyStore } from '../../store'
import SectionView from './SectionView'
import { observer } from 'mobx-react-lite'
import type { QuestionData, SectionData } from '../../types/app'
import callApi from '../../utils/api'
import { useNavigate, useParams } from 'react-router'

const SectionListView = observer(function SectionListView() {
  const surveyStore = useSurveyStore()
  const [currentSection, setCurrentSection] = useState(0)
  const data = useRef<Record<SectionData['id'], Record<QuestionData['id'], string | string[]>>>({})
  const last = currentSection === surveyStore.sections.length - 1
  const { surveyId } = useParams<{ surveyId: string }>()
  const navitate = useNavigate()

  const handleNext = async () => {
    if (last) {
      await callApi(`/surveys/${surveyId}/responses`, {
        method: 'POST',
        body: data.current,
      })
      navitate(`/surveys/${surveyId}/complete?title=${surveyStore.sections[0].title}`)
      return
    }

    setCurrentSection(currentSection + 1)
  }

  // const saveData = (sectionData: Record<QuestionData['id'], string | string[]>) => {
  //   data.current[surveyStore.sections[currentSection].id] = sectionData
  // }
  const saveData = (sectionData: Record<QuestionData['id'], string | string[]>) => {
    const questionIds = surveyStore.sections[currentSection].questions.map((q) => `${q.id}`)
    data.current[surveyStore.sections[currentSection].id] = Object.fromEntries(
      Object.entries(sectionData).filter(([key]) => questionIds.includes(key)),
    ) as Record<QuestionData['id'], string | string[]>
  }
  return (
    <SectionView
      section={surveyStore.sections[currentSection]}
      last={last}
      onSave={saveData}
      onNext={handleNext}
    />
  )
})

export default SectionListView
