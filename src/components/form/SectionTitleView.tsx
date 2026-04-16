import Section from '../../models/section'
import Panel, { PanelBody, PanelCap } from '../common/Panel'

interface Props {
  section: Section
}

function SectionTitleEditor({ section }: Props) {
  return (
    <div>
      <PanelCap />
      <Panel>
        <PanelBody className="flex flex-col">
          <h4 className="text-2xl text-gray900 font-semibold py-8">{section.title}</h4>
          <p className="mt-2 text-16 text-gray700">{section.description}</p>
        </PanelBody>
      </Panel>
    </div>
  )
}

export default SectionTitleEditor
