export type MessageFormSubmitHandlerType = (params: {
  message: string
  isAnonymous: boolean
  resetForm: () => void
  name?: string
}) => void
