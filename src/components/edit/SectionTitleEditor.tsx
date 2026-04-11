import { observer } from 'mobx-react-lite'
import Section from '../../models/section'
import Input from '../common/Input'
import Panel, { PanelBody, PanelCap } from '../common/Panel'

interface Props {
  capTitle: string
  section: Section
}

const SectionTitleEditor = observer(function SectionTitleEditor({ capTitle, section }: Props) {
  return (
    <div>
      <PanelCap>{capTitle}</PanelCap>
      <Panel>
        <PanelBody className="flex flex-col">
          <Input
            className="text-2xl text-gray900 font-semibold py-8"
            value={section.title}
            onChange={(e) => section.setTitle(e.currentTarget.value)}
          />
          <Input
            className="mt-2 text-16 text-gray700"
            value={section.description}
            onChange={(e) => section.setDescription(e.currentTarget.value)}
          />
        </PanelBody>
      </Panel>
    </div>
  )
})

export default SectionTitleEditor
