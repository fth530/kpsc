import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LayerType, UserStats } from '../types/geography';

interface GeographyState {
  hasCompletedOnboarding: boolean;
  learnedProvinces: string[];
  weakTopics: string[];
  activeMapLayers: LayerType[];
  userStats: UserStats;

  completeOnboarding: () => void;
  resetOnboarding: () => void;
  markProvinceAsLearned: (provinceId: string) => void;
  addWeakTopic: (topic: string) => void;
  removeWeakTopic: (topic: string) => void;
  toggleMapLayer: (layer: LayerType) => void;
  setActiveMapLayers: (layers: LayerType[]) => void;
  addXp: (amount: number) => void;
  incrementStreak: () => void;
  updateMastery: (percentage: number) => void;
}

export const useGeographyStore = create<GeographyState>()(
  persist(
    (set: any) => ({
      hasCompletedOnboarding: false,
      learnedProvinces: ["42", "07", "50"],
      weakTopics: ["Karstik Araziler", "Karadeniz Dağları"],
      activeMapLayers: ["all"],
      userStats: {
        streak: 7,
        xp: 1450,
        overallMasteryPercentage: 64,
        completedProvincesCount: 52,
      },

      completeOnboarding: () => set({ hasCompletedOnboarding: true }),

      resetOnboarding: () => set({ hasCompletedOnboarding: false }),

      markProvinceAsLearned: (provinceId: string) =>
        set((state: GeographyState) => {
          if (state.learnedProvinces.includes(provinceId)) return state;
          const updated = [...state.learnedProvinces, provinceId];
          const newCount = updated.length;
          const newMastery = Math.min(100, Math.round((newCount / 81) * 100));
          return {
            learnedProvinces: updated,
            userStats: {
              ...state.userStats,
              completedProvincesCount: newCount,
              overallMasteryPercentage: newMastery,
            },
          };
        }),

      addWeakTopic: (topic: string) =>
        set((state: GeographyState) => {
          if (state.weakTopics.includes(topic)) return state;
          return { weakTopics: [...state.weakTopics, topic] };
        }),

      removeWeakTopic: (topic: string) =>
        set((state: GeographyState) => ({
          weakTopics: state.weakTopics.filter((t: string) => t !== topic),
        })),

      toggleMapLayer: (layer: LayerType) =>
        set((state: GeographyState) => {
          if (layer === 'all') {
            return { activeMapLayers: ['all'] };
          }
          let filtered: LayerType[] = state.activeMapLayers.filter((l: LayerType) => l !== 'all');
          if (filtered.includes(layer)) {
            filtered = filtered.filter((l: LayerType) => l !== layer);
            if (filtered.length === 0) filtered = ['all'];
          } else {
            filtered.push(layer);
          }
          return { activeMapLayers: filtered };
        }),

      setActiveMapLayers: (layers: LayerType[]) =>
        set({ activeMapLayers: layers }),

      addXp: (amount: number) =>
        set((state: GeographyState) => ({
          userStats: {
            ...state.userStats,
            xp: state.userStats.xp + amount,
          },
        })),

      incrementStreak: () =>
        set((state: GeographyState) => ({
          userStats: {
            ...state.userStats,
            streak: state.userStats.streak + 1,
          },
        })),

      updateMastery: (percentage: number) =>
        set((state: GeographyState) => ({
          userStats: {
            ...state.userStats,
            overallMasteryPercentage: percentage,
          },
        })),
    }),
    {
      name: 'geokpss-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
