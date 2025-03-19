import styled from '@emotion/styled'
import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { IconButtonRound } from '../IconButtonRound'
import { CloseIcon } from '../Icons/CloseIcon'
import { PlusIcon } from '../Icons/PlusIcon'

interface TagInputProps {
  tags: string[]
  setTags: (tags: string[]) => void
  placeholder?: string
  validator?: RegExp | ((value: string) => boolean)
  onValidationFail?: (value: string) => void
}

const TagInput: React.FC<TagInputProps> = ({
  tags,
  setTags,
  placeholder = 'Type an address...',
  validator,
  onValidationFail,
}) => {
  const [inputValue, setInputValue] = useState<string>('')

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value)
  }

  const handleAddTag = (): void => {
    const trimmedValue = inputValue.trim()

    const isValid = validator
      ? typeof validator === 'function'
        ? validator(trimmedValue)
        : validator.test(trimmedValue)
      : true

    if (trimmedValue !== '' && !tags.includes(trimmedValue)) {
      if (isValid) {
        setTags([...tags, trimmedValue])
        setInputValue('')
      } else {
        onValidationFail?.(trimmedValue)
      }
    }
  }

  const removeTag = (removeIndex: number): void => {
    setTags(tags.filter((_, index) => index !== removeIndex))
  }

  const truncateTag = (tag: string): string => {
    return tag.length > 9 ? `${tag.slice(0, 9)}...` : tag
  }

  return (
    <TagContainer>
      <TagItem $type="input">
        <IconButtonRound
          size="medium"
          variant="filled"
          icon={<PlusIcon />}
          onClick={handleAddTag}
        />
        <Input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </TagItem>
      {tags.map((tag, index) => (
        <TagItem key={index} $type="tag">
          <IconButtonRound
            size="medium"
            variant="filled"
            icon={<CloseIcon />}
            onClick={() => removeTag(index)}
          />
          <span>{truncateTag(tag)}</span>
        </TagItem>
      ))}
    </TagContainer>
  )
}

export default TagInput

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const TagItem = styled.div<{ $type: 'input' | 'tag' }>`
  display: flex;
  height: 40px;
  align-items: center;
  border: 1px solid var(--gray);
  border-radius: 999px;
  padding: 4px;
  background-color: ${({ $type }) =>
    $type === 'tag' ? 'var(--gray-ultradark)' : 'transparent'};

  input {
    width: ${({ $type }) => ($type === 'tag' ? 'fit-content' : '112px')};
  }

  span {
    padding: 0 8px;
  }

  input,
  span {
    font-size: var(--label1-font-size);
    line-height: var(--label1-line-height);
  }
`

const Input = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  padding: 0 8px;

  &::placeholder {
    opacity: 0.5;
  }
`
