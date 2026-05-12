'use client'

import React, { createContext, useContext, useId, useState, type ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/utils'

/* -------------------------------- */
/* styles */
/* -------------------------------- */

const triggerVariants = cva(
  `
  w-full
  flex
  items-center
  justify-between
  rounded-md
  font-medium
  transition
  outline-none
  focus-visible:ring-2
  focus-visible:ring-offset-2
  disabled:opacity-50
  `,
  {
    variants: {
      size: {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-3 text-base',
        lg: 'px-5 py-4 text-lg',
      },
      color: {
        primary: 'bg-blue-500 text-white hover:bg-blue-600 focus-visible:ring-blue-500',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:ring-gray-400',
        ghost: 'bg-transparent text-black hover:bg-gray-100 focus-visible:ring-gray-400',
      },
    },
    defaultVariants: {
      size: 'md',
      color: 'primary',
    },
  },
)

const contentVariants = cva('overflow-hidden transition-all duration-300', {
  variants: {
    size: {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-5 py-4 text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

/* -------------------------------- */
/* types */
/* -------------------------------- */

type AccordionType = 'single' | 'multiple'

interface AccordionContextType {
  //   type: AccordionType
  //   value: string[]
  //   toggle: (value: string) => void
  //   size: 'sm' | 'md' | 'lg'
  //   color: 'primary' | 'secondary' | 'ghost'
  type: AccordionType
  value: string[]
  toggle: (value: string) => void
  size: NonNullable<VariantProps<typeof triggerVariants>['size']>
  color: NonNullable<VariantProps<typeof triggerVariants>['color']>
  registerTrigger: (el: HTMLButtonElement) => void
  unregisterTrigger: (el: HTMLButtonElement) => void
  focusNext: (current: HTMLButtonElement) => void
  focusPrev: (current: HTMLButtonElement) => void
  focusFirst: () => void
  focusLast: () => void
}

const AccordionContext = createContext<AccordionContextType | null>(null)

function useAccordion() {
  const ctx = useContext(AccordionContext)

  if (!ctx) {
    throw new Error('Accordion components must be inside Accordion')
  }

  return ctx
}

/* -------------------------------- */
/* Root */
/* -------------------------------- */

interface AccordionProps extends VariantProps<typeof triggerVariants> {
  //   children: ReactNode
  //   type?: AccordionType
  //   defaultValue?: string[]
  children: ReactNode
  type?: AccordionType
  defaultValue?: string[]
  size?: NonNullable<VariantProps<typeof triggerVariants>['size']>
  color?: NonNullable<VariantProps<typeof triggerVariants>['color']>
}

function Accordion({
  children,
  type = 'single',
  defaultValue = [],
  size = 'md',
  color = 'primary',
}: AccordionProps) {
  const [value, setValue] = useState<string[]>(defaultValue)

  const triggerRefs = React.useRef<HTMLButtonElement[]>([])

  const registerTrigger = (el: HTMLButtonElement) => {
    if (!triggerRefs.current.includes(el)) {
      triggerRefs.current.push(el)
    }
  }

  const unregisterTrigger = (el: HTMLButtonElement) => {
    triggerRefs.current = triggerRefs.current.filter((ref) => ref !== el)
  }

  const focusNext = (current: HTMLButtonElement) => {
    const list = triggerRefs.current
    const index = list.indexOf(current)

    const next = index === list.length - 1 ? list[0] : list[index + 1]

    next?.focus()
  }

  const focusPrev = (current: HTMLButtonElement) => {
    const list = triggerRefs.current
    const index = list.indexOf(current)

    const prev = index === 0 ? list[list.length - 1] : list[index - 1]

    prev?.focus()
  }

  const focusFirst = () => {
    triggerRefs.current[0]?.focus()
  }

  const focusLast = () => {
    triggerRefs.current.at(-1)?.focus()
  }

  const toggle = (target: string) => {
    if (type === 'single') {
      setValue((prev) => (prev.includes(target) ? [] : [target]))
      return
    }

    setValue((prev) =>
      prev.includes(target) ? prev.filter((v) => v !== target) : [...prev, target],
    )
  }

  return (
    <AccordionContext.Provider
      value={{
        type,
        value,
        toggle,
        size,
        color,

        registerTrigger,
        unregisterTrigger,
        focusNext,
        focusPrev,
        focusFirst,
        focusLast,
      }}
    >
      <div className="space-y-2">{children}</div>
    </AccordionContext.Provider>
  )
}

/* -------------------------------- */
/* Item */
/* -------------------------------- */

interface ItemContextType {
  value: string
  triggerId: string
  contentId: string
}

const ItemContext = createContext<ItemContextType | null>(null)

function useItem() {
  const ctx = useContext(ItemContext)

  if (!ctx) {
    throw new Error('Accordion.Trigger / Content must be inside Accordion.Item')
  }

  return ctx
}

interface AccordionItemProps {
  value: string
  children: ReactNode
}

function Item({ value, children }: AccordionItemProps) {
  const id = useId()

  return (
    <ItemContext.Provider
      value={{
        value,
        triggerId: `${id}-trigger`,
        contentId: `${id}-content`,
      }}
    >
      <div className="border rounded-md overflow-hidden">{children}</div>
    </ItemContext.Provider>
  )
}

/* -------------------------------- */
/* Trigger */
/* -------------------------------- */

interface TriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

function Trigger({ children, className, ...props }: TriggerProps) {
  const accordion = useAccordion()
  const item = useItem()

  const ref = React.useRef<HTMLButtonElement>(null)

  const isOpen = accordion.value.includes(item.value)

  React.useEffect(() => {
    if (!ref.current) return

    accordion.registerTrigger(ref.current)

    return () => {
      if (ref.current) {
        accordion.unregisterTrigger(ref.current)
      }
    }
  }, [accordion])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!ref.current) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        accordion.focusNext(ref.current)
        break

      case 'ArrowUp':
        e.preventDefault()
        accordion.focusPrev(ref.current)
        break

      case 'Home':
        e.preventDefault()
        accordion.focusFirst()
        break

      case 'End':
        e.preventDefault()
        accordion.focusLast()
        break

      case 'Enter':
      case ' ':
        e.preventDefault()
        accordion.toggle(item.value)
        break
    }
  }

  return (
    <h3>
      <button
        ref={ref}
        id={item.triggerId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={item.contentId}
        onClick={() => accordion.toggle(item.value)}
        onKeyDown={handleKeyDown}
        className={cn(
          triggerVariants({
            size: accordion.size,
            color: accordion.color,
          }),
          className,
        )}
        {...props}
      >
        <span>{children}</span>

        <span aria-hidden="true" className={cn('transition-transform', isOpen && 'rotate-180')}>
          ▼
        </span>
      </button>
    </h3>
  )
}

/* -------------------------------- */
/* Content */
/* -------------------------------- */

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

function Content({ children, className, ...props }: ContentProps) {
  const accordion = useAccordion()
  const item = useItem()

  const isOpen = accordion.value.includes(item.value)

  return (
    <div
      id={item.contentId}
      role="region"
      aria-labelledby={item.triggerId}
      hidden={!isOpen}
      className={cn(
        contentVariants({
          size: accordion.size,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/* -------------------------------- */
/* export compound */
/* -------------------------------- */

Accordion.Item = Item
Accordion.Trigger = Trigger
Accordion.Content = Content

export { Accordion }
