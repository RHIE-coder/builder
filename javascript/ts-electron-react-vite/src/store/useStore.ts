import { create } from 'zustand'

type DataStore = {
  data: Array<Array<string | number>>
  setData: (newData: Array<Array<string | number>>) => void
}

export const useStore = create<DataStore>((set) => ({
  data: [
    ['Main Category', 'Sub Category', 'Detail Category', 'TC Summary', 'Preconditions', 'Steps', 'Expected Results', 'Test Level'],
    ['2017', 10, 11, 12, 13, 15, 16, 11],
    ['2018', 10, 11, 12, 13, 15, 16, 11],
    ['2019', 10, 11, 12, 13, 15, 16, 11],
    ['2020', 10, 11, 12, 13, 15, 16, 11],
    ['2021', 10, 11, 12, 13, 15, 16, 11],
  ],
  setData: (newData) => set({ data: newData }),
})) 