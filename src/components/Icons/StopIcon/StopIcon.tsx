import React, { SVGProps } from 'react'

export const StopIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    {...props}
  >
    <path d="M0.5 0.5H7.5V7.5H0.5V0.5Z" fill="currentColor" />
  </svg>
)
