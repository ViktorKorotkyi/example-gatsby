import create from 'zustand';

interface CatFactState {
  catFact: string | null;
  error: string | null;
  fetchCatFact: () => void;
}

const useStore = create<CatFactState>((set) => ({
  catFact: null,
  error: null,
  fetchCatFact: async () => {
    try {
      const response = await fetch('https://catfact.ninja/fact');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      set({ catFact: data.fact, error: null });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
}));

export default useStore;
