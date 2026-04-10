import {
  createContext,
  useCallback,
  useContext,
  useState,
  type PropsWithChildren,
  type ReactNode,
  type RefObject,
} from 'react'
import ArrowIcon from '../../assets/icons/arrow_drop_down.svg?react'
import useOutsideClick from '../../hooks/common/useOutsideClick'

type DropdownOption<T> = {
  label: ReactNode
  value: T
}

interface DropdownContextType<T = unknown> {
  opened: boolean
  open: () => void
  close: () => void
  options: DropdownOption<T>[]
  selected: number
  onChange: (index: number) => void
}

interface DropdownProps<T> {
  defaultValue?: T
  placeholder?: string
  options: DropdownOption<T>[]
  onChange?: (value: T) => void
}

const DropdownContext = createContext<DropdownContextType | null>(null)

function Dropdown<T>({
  defaultValue,
  placeholder,
  options,
  onChange,
}: PropsWithChildren<DropdownProps<T>>) {
  const [opened, setOpened] = useState(false)
  const [selected, setSelected] = useState(
    defaultValue ? options.findIndex((option) => option.value === defaultValue) : -1,
  )

  const open = useCallback(() => setOpened(true), [])
  const close = useCallback(() => setOpened(false), [])

  const handleChange = useCallback(
    (index: number) => {
      setSelected(index)
      onChange?.(options[index].value)
      close()
    },
    [close, onChange, options],
  )

  return (
    <DropdownContext.Provider
      value={{
        opened,
        open,
        close,
        options,
        selected,
        onChange: handleChange,
      }}
    >
      <div className="text-left inline-block relative">
        <DropdownButton placeholder={placeholder} />
        <DropdwonMenu />
      </div>
    </DropdownContext.Provider>
  )
}

function DropdownButton({ placeholder = 'selected' }: { placeholder?: string }) {
  const { open, options, selected } = useContext(DropdownContext)!
  return (
    <button
      className="border border-gray-300 rounded-10 min-w-197 p-12 pr-36 relative text-left"
      onClick={open}
    >
      {selected >= 0 ? options[selected].label : (placeholder ?? '')}
      <span className="absolute right-12 top-1/2 trasnform -translate-y-1/2">
        <ArrowIcon />
      </span>
    </button>
  )
}

function DropdwonMenu() {
  const { close, opened, options, onChange } = useContext(DropdownContext)
  const containerRef = useOutsideClick<HTMLDivElement>(close)
  return opened ? (
    <div
      ref={containerRef}
      className="absolute left-0 top-100% w-full flex flex-col mt-10 border border-gray200 rounded-10 bg-white z-10"
    >
      {options.map((option, index) => (
        <DropdownMenuItem
          key={`${option.value}`}
          label={option.label}
          onSelect={() => onChange(index)}
        />
      ))}
    </div>
  ) : null
}

function DropdownMenuItem({ label, onSelect }: { label: ReactNode; onSelect: () => void }) {
  return (
    <button className="text-left p-12 border-b border-gray200 last:border-none" onClick={onSelect}>
      {label}
    </button>
  )
}

export default Dropdown
