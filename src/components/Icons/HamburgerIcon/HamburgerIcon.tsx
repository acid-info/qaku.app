import React, { SVGProps } from 'react'

export const HamburgerIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1.75 10.5H12.25V9.33333H1.75V10.5ZM1.75 7.58333H12.25V6.41667H1.75V7.58333ZM1.75 3.5V4.66667H12.25V3.5H1.75Z"
      fill="white"
    />
  </svg>
)
