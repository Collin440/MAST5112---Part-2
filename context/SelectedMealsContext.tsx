import React, { createContext, useContext, useState } from 'react';

export type Meal = {
  id: string;
  name: string;
};

type SelectedMealsContextType = {
  selectedMeals: Meal[];
  setSelectedMeals: (meals: Meal[]) => void;
};

const SelectedMealsContext = createContext<SelectedMealsContextType | undefined>(undefined);

export const SelectedMealsProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [selectedMeals, setSelectedMeals] = useState<Meal[]>([]);
  return (
    <SelectedMealsContext.Provider value={{ selectedMeals, setSelectedMeals }}>
      {children}
    </SelectedMealsContext.Provider>
  );
};

export const useSelectedMeals = () => {
  const context = useContext(SelectedMealsContext);
  if (!context) {
    throw new Error('useSelectedMeals must be used within a SelectedMealsProvider');
  }
  return context;
};