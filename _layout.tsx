import { Slot } from 'expo-router';
import { MenuProvider } from './context/MenuContext';

export default function RootLayout() {
  return (
    <MenuProvider>
      <Slot />
    </MenuProvider>
  );
}