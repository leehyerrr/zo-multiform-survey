import {
  createContext,
  useCallback,
  useContext,
  useState,
  type PropsWithChildren,
  type ReactNode,
} from 'react'

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
  placeholder?: string
  options: DropdownOption<T>[]
  onChange?: (value: T) => void
}

const DropdownContext = createContext<DropdownContextType | null>(null)

function Dropdown<T>({ placeholder, options, onChange }: PropsWithChildren<DropdownProps<T>>) {
  const [opened, setOpened] = useState(false)
  const [selected, setSelected] = useState(-1)

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
    <button onClick={open}>{selected >= 0 ? options[selected].label : (placeholder ?? '')}</button>
  )
}

function DropdwonMenu() {
  const { opened, options, onChange } = useContext(DropdownContext)
  return opened ? (
    <div>
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
  return <button onClick={onSelect}>{label}</button>
}

export default Dropdown
