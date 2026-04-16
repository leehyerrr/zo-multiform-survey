import { Controller, useFormContext } from 'react-hook-form'
import Question from '../../models/question'
import Input from '../common/Input'
import Dropdown from '../common/Dropdown'
import Textarea, { AutoGrow } from '../common/Textarea'
import Radio from '../common/Radio'
import Checkbox from '../common/Checkbox'

interface Props {
  question: Question
}

function QuestionForm({ question }: Props) {
  const { control, register } = useFormContext()
  switch (question.type) {
    case 'shortText':
      return (
        <Input
          className="pb-6 pl-0! border-b border-transparent focus:border-b-gray-200! focus:bg-transparent "
          {...register(`${question.id}`, {
            required: {
              value: question.required,
              message: '필수 항목 입니다.',
            },
          })}
        />
      )
    case 'date':
      return (
        <Input
          type="date"
          className="pb-6 pl-0! border-b border-transparent focus:border-b-gray-200! focus:bg-transparent "
          {...register(`${question.id}`, {
            required: {
              value: question.required,
              message: '필수 항목 입니다.',
            },
          })}
        />
      )
    case 'time':
      return (
        <Input
          type="time"
          className="pb-6 pl-0! border-b border-transparent focus:border-b-gray-200! focus:bg-transparent "
          {...register(`${question.id}`, {
            required: {
              value: question.required,
              message: '필수 항목 입니다.',
            },
          })}
        />
      )
    case 'dropdown':
      return (
        <Controller
          name={`${question.id}`}
          control={control}
          render={({ field }) => (
            <Dropdown
              className="mt-15"
              options={question.options!.map((option) => ({
                label: <span>{option}</span>,
                value: option,
              }))}
              onChange={field.onChange}
            />
          )}
          rules={{
            required: {
              value: question.required,
              message: '필수 항목 입니다',
            },
          }}
        />
      )
    case 'longText':
      return (
        <AutoGrow className="w-full" forTextarea={`${question.id}`}>
          <Textarea
            className="w-full border-b focus:border-b-gray200 focus:bg-transparent"
            rows={1}
            {...register(`${question.id}`, {
              required: {
                value: question.required,
                message: '필수 항목 입니다',
              },
            })}
          />
        </AutoGrow>
      )
    case 'multipleChoice':
      return (
        <div className="flex flex-col gap-y-7 mt-15">
          {question.options!.map((option) => (
            <Radio
              key={option}
              label={option}
              value={option}
              {...register(`${question.id}`, {
                required: {
                  value: question.required,
                  message: '필수 항목 입니다.',
                },
              })}
            />
          ))}
        </div>
      )
    case 'checkbox':
      return (
        <div className="flex flex-col gap-y-7 mt-15">
          {question.options!.map((option) => (
            <Checkbox
              key={option}
              label={option}
              value={option}
              {...register(`${question.id}`, {
                required: {
                  value: question.required,
                  message: '필수 항목 입니다.',
                },
              })}
            />
          ))}
        </div>
      )
    default:
      return null
  }
}

export default QuestionForm
