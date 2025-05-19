import React, { createContext, useContext, useState } from "react";

// These are my menu items 
const DEFAULT_MENU = [
  { id: "1", name: "Cedar Plank Salmon", course: "Main", description: "Grilled salmon on a cedar plank", price: 180 },
  { id: "2", name: "Beef Wellington", course: "Main", description: "Classic beef wellington with mushroom duxelles", price: 230 },
  { id: "3", name: "Caesar Salad", course: "Starter", description: "Crisp romaine with Caesar dressing", price: 65 },
  { id: "4", name: "Raspberry Trifle", course: "Dessert", description: "Layers of cake, custard, and raspberries", price: 85 },
];

type MenuItem = {
  id: string;
  name: string;
  course: string;
  description: string;
  price: number;
};

type MenuContextValue = {
  menu: MenuItem[];
  selectedItemIds: string[];
  toggleSelectItem: (id: string) => void;
  isItemSelected: (id: string) => boolean;
  setMenu: (menu: MenuItem[]) => void;
  addMenuItem: (item: Omit<MenuItem, "id">) => void;
  editMenuItem: (id: string, updates: Omit<MenuItem, "id">) => void;
  deleteMenuItem: (id: string) => void;
};

const MenuContext = createContext<MenuContextValue | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menu, setMenu] = useState<MenuItem[]>(DEFAULT_MENU);
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);

  const toggleSelectItem = (id: string) => {
    setSelectedItemIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const isItemSelected = (id: string) => selectedItemIds.includes(id);

  const addMenuItem = (item: Omit<MenuItem, "id">) => {
    const newId = (Date.now() + Math.random()).toString();
    setMenu(prev => [...prev, { ...item, id: newId }]);
  };

  const editMenuItem = (id: string, updates: Omit<MenuItem, "id">) => {
    setMenu(prev =>
      prev.map(item => item.id === id ? { ...item, ...updates } : item)
    );
  };

  const deleteMenuItem = (id: string) => {
    setMenu(prev => prev.filter(item => item.id !== id));
    setSelectedItemIds(prev => prev.filter(itemId => itemId !== id)); 
  };

  return (
    <MenuContext.Provider value={{
      menu,
      selectedItemIds,
      toggleSelectItem,
      isItemSelected,
      setMenu,
      addMenuItem,
      editMenuItem,
      deleteMenuItem
    }}>
      {children}
    </MenuContext.Provider>
  );
};

export function useMenu() {
  const ctx = useContext(MenuContext);
  if (!ctx) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return ctx;
}