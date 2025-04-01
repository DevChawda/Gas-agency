import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function Layout() {
  return (
    <GestureHandlerRootView >
      <Drawer>
        <Drawer.Screen name="(tabs)" options={{headerShown:true, title: '',}} />
        
      </Drawer>
    </GestureHandlerRootView>
  );
}
