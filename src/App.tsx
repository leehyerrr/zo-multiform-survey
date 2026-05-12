import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import MainLayout from './components/common/MainLayout'
import { SurveyStoreProvider } from './store'
import AdminPage from './pages/AdminPage'
import CreatePage from './pages/CreatePage'
import EditPage from './pages/EditPage'
import FormPage from './pages/FormPage'
import CompletePage from './pages/CompletePage'
import Test from './pages/Test'

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <SurveyStoreProvider>
          <Routes>
            <Route path="/surveys/new" element={<CreatePage />} />
            <Route path="/surveys/:surveyId" element={<FormPage />} />
            <Route path="/surveys/:surveyId" element={<AdminPage />}>
              <Route path="edit" element={<EditPage />} />
              <Route path="responses" element={<div>응답</div>} />
            </Route>
            <Route path="/surveys/:surveyId/complete" element={<CompletePage />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </SurveyStoreProvider>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
