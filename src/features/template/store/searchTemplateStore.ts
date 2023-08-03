import { create } from 'zustand'

type StoreState = {
  searchTemplate: string
  setSearchTemplate: (searchTemplate?: string) => void
  searchInput: string
  setSearchInput: (searchInput?: string) => void
}

const useSearchStore = create<StoreState>((set) => ({
  searchTemplate: '',
  setSearchTemplate: (searchTemplate) => set({ searchTemplate: searchTemplate ?? '' }),
  searchInput: '',
  setSearchInput: (searchInput) => set({ searchInput: searchInput ?? '' }),
}))

export { useSearchStore }
