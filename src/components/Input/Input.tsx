import styled from '@emotion/styled'
import React from 'react'

export type InputProps = {
  placeholder?: string
}

export const Input: React.FC<InputProps> = ({ placeholder = '', ...props }) => {
  return <StyledInput placeholder={placeholder} {...props} />
}

const StyledInput = styled.input`
  width: 100%;
  border: none;
  padding: 22px 16px;
  background-color: var(--gray-ultradark);
  color: var(--white);
  font-size: var(--body2-font-size);
  line-height: var(--body2-line-height);

  &::placeholder {
    opacity: 0.4;
  }

  &:focus {
    outline: none;
  }
`
