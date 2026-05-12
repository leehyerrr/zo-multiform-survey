import { Accordion } from '../components/common/Accordion'

function Test() {
  return (
    <>
      <Accordion type="single" size="md" color="primary" defaultValue={['item-2']}>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>첫 번째 메뉴</Accordion.Trigger>
          <Accordion.Content>첫 번째 내용입니다.</Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="item-2">
          <Accordion.Trigger>두 번째 메뉴</Accordion.Trigger>
          <Accordion.Content>두 번째 내용입니다.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-3">
          <Accordion.Trigger>세 번째 메뉴</Accordion.Trigger>
          <Accordion.Content>세 번째 내용입니다.</Accordion.Content>
        </Accordion.Item>
      </Accordion>
      <br />
      <br />
      <br />
      <Accordion type="multiple" size="md" color="primary" defaultValue={['item-2']}>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>1첫 번째 메뉴</Accordion.Trigger>
          <Accordion.Content>11첫 번째 내용입니다.</Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="item-2">
          <Accordion.Trigger>2두 번째 메뉴</Accordion.Trigger>
          <Accordion.Content>22두 번째 내용입니다.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-3">
          <Accordion.Trigger>3세 번째 메뉴</Accordion.Trigger>
          <Accordion.Content>33세 번째 내용입니다.</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </>
  )
}

export default Test
