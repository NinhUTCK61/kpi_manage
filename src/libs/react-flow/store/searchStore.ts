import { create } from 'zustand'

type StoreState = {
  searchParam: string
  setSearchParam: (searchParam: string) => void
}

const useSearchStore = create<StoreState>((set) => ({
  searchParam: '',
  setSearchParam: (searchParam: string) => set({ searchParam: searchParam }),
}))

export { useSearchStore }
