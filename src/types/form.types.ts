export type MessageFormSubmitHandler = (params: {
  message: string
  isAnonymous: boolean
  resetForm: () => void
  name?: string
}) => void
