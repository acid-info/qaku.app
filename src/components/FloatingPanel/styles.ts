import styled from '@emotion/styled'

/**
 * Styled Components Structure
 * -------------------------
 * <PanelContent>
 * ├── <SettingGroup>         // Vertical group of related settings
 * │   ├── <SettingField>     // SettingField = Label + Control
 * │   │   ├── isRow={true}   // Horizontal layout with SettingRowLayout
 * │   │   └── isRow={false}  // Vertical layout with Fragment
 * │   └── <SettingStack>     // Vertical stack for inputs
 * └── <ActionBar>            // Bottom actions
 *
 * Common Patterns:
 * <SettingField isRow>         - For Toggle, Tab controls
 * <SettingStack><SettingField> - For Input controls
 */

export const PanelContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding-top: 48px;
  width: 100%;
  height: 100%;
`

export const SettingRowLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export const SettingLabelGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;

  h3 {
    margin: 0 !important;
  }
`

export const SettingDescription = styled.span`
  font-size: var(--label1-font-size);
  line-height: var(--label1-line-height);
  color: var(--white);
  opacity: 0.7;
`

export const SettingGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const SettingStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`

export const ActionBar = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: auto;
`
