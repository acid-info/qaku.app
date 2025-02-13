import styled from '@emotion/styled'
import React from 'react'

import { Dropdown } from '../Dropdown'
import { Search } from '../Search'

export type SearchAndFilterProps = {
  onSearch: (value: string) => void
  options: Array<{ label: string; value: string | number }>
  value?: string | number
  onFilterChange: (value: string | number) => void
  searchLabel?: string
  searchPlaceholder?: string
  filterPlaceholder?: string
  filterWidth?: string
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  onSearch,
  options,
  value,
  onFilterChange,
  searchLabel,
  searchPlaceholder,
  filterPlaceholder,
  filterWidth,
}) => {
  return (
    <Container>
      <DropdownStyled
        options={options}
        value={value}
        onChange={onFilterChange}
        placeholder={filterPlaceholder}
        variant="outlined"
        width={filterWidth}
      />
      <SearchStyled
        label={searchLabel}
        placeholder={searchPlaceholder}
        onSearch={onSearch}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
`

const DropdownStyled = styled(Dropdown)<{ width?: string }>`
  ${({ width }) => width && `width: ${width};`}
`

const SearchStyled = styled(Search)`
  button {
    border-left: none;
  }
`
