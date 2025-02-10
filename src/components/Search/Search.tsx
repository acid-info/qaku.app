import styled from '@emotion/styled'
import React, { useState } from 'react'
import { SearchIcon } from '../Icons/SearchIcon'

export type SearchProps = {
  onSearch?: (value: string) => void
  placeholder?: string
}

export const Search: React.FC<SearchProps> = ({
  onSearch,
  placeholder = 'Type..',
}) => {
  const [isActive, setIsActive] = useState(false)

  return (
    <SearchWrapper>
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
          <SearchText>Search</SearchText>
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
    $isActive ? 'var(--gray-darkest)' : 'transparent'};
  border: 1px solid var(--gray);
  padding: 8px 16px;
  cursor: pointer;
  min-width: 92px;
  height: 31px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--gray-darker);
  }
`

const SearchIconWrapper = styled.span`
  display: flex;
  align-items: center;
  color: var(--white);
`

const SearchText = styled.span`
  color: var(--white);
  font-size: 14px;
`

const SearchInput = styled.input`
  background: none;
  border: none;
  outline: none;
  color: var(--white);
  font-size: 14px;
  width: 100%;
  min-width: 150px;

  &::placeholder {
    color: var(--white);
    opacity: 0.4;
  }
`
