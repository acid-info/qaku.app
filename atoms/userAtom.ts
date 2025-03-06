import { UserType } from '@/types/user.types'
import { atom } from 'jotai'

const initialUser: UserType = {
  // Todo get proper user id
  id: 'user13',
}

export const userAtom = atom<UserType>(initialUser)
