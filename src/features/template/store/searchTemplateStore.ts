import { create } from 'zustand'

type StoreState = {
  searchTemplate: string
  setSearchTemplate: (searchTemplate?: string) => void
}

const useSearchStore = create<StoreState>((set) => ({
  searchTemplate: '',
  setSearchTemplate: (searchTemplate) => set({ searchTemplate: searchTemplate ?? '' }),
}))

export { useSearchStore }
