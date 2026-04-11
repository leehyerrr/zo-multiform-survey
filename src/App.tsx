import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import MainLayout from './components/common/MainLayout'
import Tabs, { Tab, TabList, TabPanel, TabPanels } from './components/common/Tabs'
import SectionListEditor from './components/edit/SectionListEditor'
import { SurveyStoreProvider } from './store'
import AdminPage from './pages/AdminPage'

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <SurveyStoreProvider>
          <Routes>
            <Route path="/surveys/:surveyId" element={<AdminPage />}>
              <Route path="edit" element={<SectionListEditor />} />
              <Route path="responses" element={<div>응답</div>} />
            </Route>
          </Routes>
          {/* <Tabs>
          <TabList>
            <Tab index={0}>tab1</Tab>
            <Tab index={1}>tab2</Tab>
          </TabList>
          <TabPanels>
            <TabPanel index={0}>
              <SectionListEditor />
            </TabPanel>
            <TabPanel index={1}>2222</TabPanel>
          </TabPanels>
        </Tabs> */}
        </SurveyStoreProvider>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
