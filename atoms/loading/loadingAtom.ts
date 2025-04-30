import { atom } from 'jotai'

// TODO-vaclav example of an atom that manages a loading state globally
export interface LoadingState {
  isLoading: boolean
  message?: string
}

const initialLoadingState: LoadingState = {
  isLoading: false, // change to true manually to test it
  message: '', // change message manually to test it
}

export const loadingAtom = atom<LoadingState>(initialLoadingState)
