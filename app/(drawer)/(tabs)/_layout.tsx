import { Tabs } from "expo-router";

const TabsRoot = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ href: null }} /> 
      <Tabs.Screen name="cerateTransaction" options={{ href: null }} /> 
      <Tabs.Screen name="home" options={{headerShown : false}}/>
      <Tabs.Screen name="location" options={{headerShown : false}} />
      <Tabs.Screen name="QR" options={{headerShown : false}} />
      <Tabs.Screen name="transaction" options={{headerShown : false}} />
      <Tabs.Screen name="contact" options={{headerShown : false}} />
    </Tabs>
  );
};

export default TabsRoot;
