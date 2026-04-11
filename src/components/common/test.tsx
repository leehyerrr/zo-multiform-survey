import { useRef } from 'react'

function Test() {
  const xx = useRef<HTMLElement>(null)
  return (
    <div>
      <div ref={xx}>ddd</div>

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
    </div>
  )
}

export default Test
