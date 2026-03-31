import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { PaperProvider } from 'react-native-paper';
import { I18nManager } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Import screens
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import PayslipScreen from './screens/PayslipScreen';
import LeaveScreen from './screens/LeaveScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';

// Import services
import { I18nService } from './services/I18nService';
import { AuthService } from './services/AuthService';
import { NotificationService } from './services/NotificationService';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Main Tab Navigator
function MainTabs() {
  const { t } = I18nService;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Dashboard':
              iconName = 'dashboard';
              break;
            case 'Payslip':
              iconName = 'description';
              break;
            case 'Leave':
              iconName = 'event';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            case 'Settings':
              iconName = 'settings';
              break;
            default:
              iconName = 'help';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0066cc',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{ title: t('nav.dashboard') }}
      />
      <Tab.Screen 
        name="Payslip" 
        component={PayslipScreen}
        options={{ title: t('selfservice.payslip') }}
      />
      <Tab.Screen 
        name="Leave" 
        component={LeaveScreen}
        options={{ title: t('nav.leave') }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: t('common.profile') }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ title: t('nav.settings') }}
      />
    </Tab.Navigator>
  );
}

// Root Navigator
function RootNavigator() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    // Initialize app
    const initializeApp = async () => {
      try {
        // Initialize i18n
        await I18nService.initialize();
        
        // Check authentication status
        const isAuthenticated = await AuthService.isAuthenticated();
        setIsLoggedIn(isAuthenticated);
        
        // Initialize notifications
        await NotificationService.initialize();
        
        // Force RTL for Arabic languages if needed
        if (I18nService.getCurrentLanguage() === 'ar') {
          I18nManager.forceRTL(true);
        }
      } catch (error) {
        console.error('App initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name="Main" component={MainTabs} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}

// Splash Screen
function SplashScreen() {
  return (
    <View style={styles.splashContainer}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>NamiPay</Text>
        <Text style={styles.logoSubtext}>AI</Text>
      </View>
      <Text style={styles.splashText}>Empowering Namibian Workers</Text>
      <ActivityIndicator size="large" color="#0066cc" style={styles.loader} />
    </View>
  );
}

// Main App Component
export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0066cc',
  },
  logoSubtext: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00a651',
    marginLeft: 5,
  },
  splashText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  loader: {
    marginTop: 20,
  },
});
