import React, { ReactNode } from 'react'
import {
  SettingDescription,
  SettingLabelGroup,
  SettingRowLayout,
} from './styledComponents'

export type SettingFieldProps = {
  title: string
  description: string
  children: ReactNode
  isRow?: boolean
}

export const SettingField: React.FC<SettingFieldProps> = ({
  title,
  description,
  children,
  isRow = false,
}) => {
  const Container = isRow ? SettingRowLayout : React.Fragment

  return (
    <Container>
      <SettingLabelGroup>
        <h3>{title}</h3>
        <SettingDescription>{description}</SettingDescription>
      </SettingLabelGroup>
      {children}
    </Container>
  )
}
