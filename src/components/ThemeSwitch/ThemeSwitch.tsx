import { MoonIcon } from '@/components/Icons/MoonIcon'
import { SunIcon } from '@/components/Icons/SunIcon'
import { IconButton } from '@acid-info/lsd-react'
import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLButtonElement> {
  toggle: () => void
  size?: 'small' | 'medium' | 'large'
}

export const ThemeSwitch = ({ toggle, size = 'medium', ...props }: Props) => {
  return (
    <IconButton onClick={() => toggle()} size={size} {...props}>
      <MoonIcon color="primary" className="dark-mode-hidden" />
      <SunIcon color="primary" className="light-mode-hidden" />
    </IconButton>
  )
}
