import styled from '@emotion/styled'
import React, { useState } from 'react'
import { SearchIcon } from '../Icons/SearchIcon'

export type SearchProps = {
  onSearch?: (value: string) => void
  label?: string
  placeholder?: string
}

export const Search: React.FC<SearchProps> = ({
  onSearch,
  label = 'Search',
  placeholder = 'Type..',
  ...props
}) => {
  const [isActive, setIsActive] = useState(false)

  return (
    <SearchWrapper {...props}>
      <SearchButton
        type="button"
        onClick={() => !isActive && setIsActive(true)}
        $isActive={isActive}
      >
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        {isActive ? (
          <SearchInput
            name="search"
            placeholder={placeholder}
            autoFocus
            onChange={(e) => onSearch?.(e.target.value)}
            onBlur={(e) => {
              if (!e.target.value) {
                setIsActive(false)
              }
            }}
          />
        ) : (
          <SearchText>{label}</SearchText>
        )}
      </SearchButton>
    </SearchWrapper>
  )
}

const SearchWrapper = styled.div`
  width: fit-content;
`

const SearchButton = styled.button<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${({ $isActive }) =>
    $isActive ? 'var(--gray-ultradark)' : 'transparent'};
  border: 1px solid var(--gray);
  padding: 8px 16px;
  cursor: pointer;
  min-width: 92px;
  width: fit-content;
  height: 32px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--gray-darkest);
  }
`

const SearchIconWrapper = styled.span`
  display: flex;
  align-items: center;
  color: var(--white);
  flex-shrink: 0;
`

const SearchText = styled.span`
  color: var(--white);
  font-size: var(--label1-font-size);
  line-height: var(--label1-line-height);
  white-space: nowrap;
`

const SearchInput = styled.input`
  background: none;
  border: none;
  outline: none;
  font-size: var(--label1-font-size);
  line-height: var(--label1-line-height);
  width: 150px;

  &::placeholder {
    opacity: 0.4;
  }
`
