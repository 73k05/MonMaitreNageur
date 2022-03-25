// @ts-ignore
import {GRAPHQL_URL} from 'react-native-dotenv';
import 'react-native-gesture-handler';
import React, {useEffect, useRef} from 'react';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import {Provider as PaperProvider} from 'react-native-paper';
import {
  AboutScreen,
  AccountScreen,
  ActivityScreen,
  BeforeStartingContentScreen,
  ChatBotScreen,
  CoachSingleScreen,
  CoachsScreen,
  CongratulationsScreen,
  ContactScreen,
  CountdownScreen,
  DeleteAccountScreen,
  ExerciseScreen,
  FaqScreen,
  FollowScreen,
  HomeScreen,
  InfoDeleteScreen,
  InfoPersoScreen,
  InstructionMnsScreen,
  LoginScreen,
  PasswordScreen,
  PrerequisitesScreen,
  SeanceScreen,
  SignUpScreen,
  StretchingScreen,
  SwiperScreen,
  WelcomeScreen,
} from './screens';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import settings from './paper-settings';
import {AuthConsumer, AuthProvider} from './Auth';
import {setContext} from '@apollo/client/link/context';
import {getToken} from './utils';
import {AccountIcon, CoachIcon, HomeIcon} from './components';
import {fonts} from './assets/style';
import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';
import FlashMessage from 'react-native-flash-message';
import analytics from '@react-native-firebase/analytics';
import {onError} from '@apollo/client/link/error';
import * as SplashScreen from 'expo-splash-screen';
import * as ScreenOrientation from 'expo-screen-orientation';

const httpLink = createHttpLink({
  uri: GRAPHQL_URL,
});

const authLink = setContext(async (_, {headers}) => {
  const token = await getToken();
  return {
    headers: {
      ...headers,
      Authorization: token ? `${token}` : '',
    },
  };
});

const errorLink = onError(({graphQLErrors}) => {
  if (graphQLErrors) {
    graphQLErrors.map(({message}) => console.log(message));
  }
});
const client = new ApolloClient({
  link: ApolloLink.from([authLink.concat(httpLink), errorLink]),
  cache: new InMemoryCache(),
});

const Stack = createStackNavigator();
const Tabs = AnimatedTabBarNavigator();

function AccountStackScreens() {
  return (
    <Stack.Navigator
      initialRouteName={'Account'}
      screenOptions={{headerShown: false, headerLeft: () => null}}
      headerMode={'none'}>
      <Stack.Screen name={'Account'} component={AccountScreen} />
      <Stack.Screen name={'InfoPerso'} component={InfoPersoScreen} />
      <Stack.Screen name={'Password'} component={PasswordScreen} />
      <Stack.Screen name={'FAQ'} component={FaqScreen} />
      <Stack.Screen name={'About'} component={AboutScreen} />
      <Stack.Screen name={'Follow'} component={FollowScreen} />
      {/*<Stack.Screen name={'Subscription'} component={SubscriptionScreen} />*/}
      <Stack.Screen name={'Contact'} component={ContactScreen} />
    </Stack.Navigator>
  );
}

function CoachStackScreens() {
  return (
    <Stack.Navigator
      initialRouteName={'Coachs'}
      screenOptions={{headerShown: false, headerLeft: () => null}}
      headerMode={'none'}>
      <Stack.Screen name={'Coachs'} component={CoachsScreen} />
    </Stack.Navigator>
  );
}

export function TabBarNavigation() {
  return (
    <Tabs.Navigator
      appearance={{}}
      tabBarOptions={{
        activeTintColor: '#002E72',
        activeBackgroundColor: '#DDE7EE',
        inactiveTintColor: '#C8D9E5',
        labelStyle: {
          fontFamily: fonts.cm,
          fontWeight: 'bold',
        },
      }}>
      <Tabs.Screen
        name="Activités"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}: any) => (
            <HomeIcon color={focused ? '#002E72' : '#C8D9E5'} />
          ),
        }}
      />
      <Tabs.Screen
        name="Coachs"
        component={CoachStackScreens}
        options={{
          tabBarIcon: ({focused}: any) => (
            <CoachIcon color={focused ? '#002E72' : '#C8D9E5'} />
          ),
        }}
      />
      <Tabs.Screen
        name="Compte"
        component={AccountStackScreens}
        options={{
          tabBarIcon: ({focused}: any) => (
            <AccountIcon color={focused ? '#002E72' : '#C8D9E5'} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

function StartScreenStack() {
  return <TabBarNavigation />;
}

const Main = ({status}: any) => {
  console.log('Open app Main');
  const navigationRef = useRef(null);
  if (status === 'idle') {
    console.log('Idle, cannot work');
    return null;
  }

  const initialRoute =
    status === 'signIn' ? 'Home' : status === 'signOut' ? 'Login' : 'Swiper';
  console.log('Open app');
  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={async () => {
        // @ts-ignore
        const currentRoute = navigationRef?.current?.getCurrentRoute();
        const currentRouteName = currentRoute?.name || 'Inconnu';

        await analytics().logScreenView({
          screen_name: currentRouteName,
          screen_class: currentRouteName,
        });
      }}>
      <FlashMessage position={'top'} />
      <Stack.Navigator
        screenOptions={{headerShown: false, headerLeft: () => null}}
        headerMode={'none'}
        initialRouteName={initialRoute}>
        <Stack.Screen name={'Login'} component={LoginScreen} />
        <Stack.Screen name={'Swiper'} component={SwiperScreen} />
        <Stack.Screen name={'SignUp'} component={SignUpScreen} />
        <Stack.Screen name={'Welcome'} component={WelcomeScreen} />
        <Stack.Screen name={'Home'} component={StartScreenStack} />
        <Stack.Screen name={'ChatBot'} component={ChatBotScreen} />
        <Stack.Screen name={'Activity'} component={ActivityScreen} />
        <Stack.Screen name={'Coach'} component={CoachSingleScreen} />
        <Stack.Screen name={'Session'} component={SeanceScreen} />
        <Stack.Screen name={'Exercise'} component={ExerciseScreen} />
        <Stack.Screen
          name={'Congratulations'}
          component={CongratulationsScreen}
        />
        <Stack.Screen name={'Prerequisites'} component={PrerequisitesScreen} />
        <Stack.Screen name={'Countdown'} component={CountdownScreen} />
        <Stack.Screen name={'Stretching'} component={StretchingScreen} />
        <Stack.Screen name={'InfoDeleteAccount'} component={InfoDeleteScreen} />
        <Stack.Screen name={'DeleteAccount'} component={DeleteAccountScreen} />
        <Stack.Screen
          name={'InstructionMns'}
          component={InstructionMnsScreen}
        />
        <Stack.Screen
          name={'BeforeStartingContent'}
          component={BeforeStartingContentScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  console.log('Open app First');
  useEffect(() => {
    console.log('Open app UseEffect');
    SplashScreen.hideAsync().then(r => {
      console.log(`Splash screen hidden: ${r}`);
    });
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT,
    ).then(value => {
      console.log(`Orientation locked: ${value}`);
    });
  }, []);

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <PaperProvider settings={settings}>
          <AuthConsumer>
            {value => <Main key={value.status} {...value} />}
          </AuthConsumer>
        </PaperProvider>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;
