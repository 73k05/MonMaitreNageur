import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';
import {palettes} from '../assets/style';
import {useNavigation} from '@react-navigation/native';

export const useNotification = () => {
  const navigation = useNavigation();

  const show = () => {
    (async () => {
      const n = await AsyncStorage.getItem('notification');
      if (n) {
        await AsyncStorage.removeItem('notification');
        const notif = JSON.parse(n);
        switch (notif?.type) {
          case 'welcome':
            const formalText =
              notif?.formal === false ? 'tu viens' : 'vous venez';
            const badgeText =
              notif?.civility === 3 ? 'nouvelle nageuse' : 'nouveau nageur';
            showMessage({
              message: `Félicitations ${notif?.firstname}`,
              description: `${formalText} de débloquer le badge Bienvenue :)`,
              type: 'info',
              icon: 'success',
              duration: 5000,
              backgroundColor: palettes.notification.bg,
              color: palettes.notification.text,
              onPress: () => {
                navigation.navigate('Succès');
              },
            });
            break;
          case 'saveUser':
            showMessage({
              message: 'Informations enregistrées',
              description:
                'Vos informations personnelles ont été mises à jour.',
              type: 'info',
              icon: 'success',
              duration: 3000,
              backgroundColor: palettes.notification.bg,
              color: palettes.notification.text,
              onPress: () => {
                navigation.navigate('Compte');
              },
            });
            break;
          case 'changePassword':
            showMessage({
              message: 'Mot de passe enregistré',
              description: 'Votre mot de passe a été mis à jour.',
              type: 'info',
              icon: 'success',
              duration: 3000,
              backgroundColor: palettes.notification.bg,
              color: palettes.notification.text,
              onPress: () => {
                navigation.navigate('Compte');
              },
            });
            break;
          case 'wrongAppVersion':
            showMessage({
              message: 'Nouvelle version',
              description: "Vous devez mettre à jour l'application",
              type: 'info',
              icon: 'success',
              duration: 3000,
              backgroundColor: palettes.notification.bg,
              color: palettes.notification.text,
            });
            break;
          case 'contactMail':
            showMessage({
              message: 'Demande de contact',
              description: 'Votre message a été envoyé avec succès !',
              type: 'info',
              icon: 'success',
              duration: 3000,
              backgroundColor: palettes.notification.bg,
              color: palettes.notification.text,
            });
            break;
          case 'certificateDownloaded':
            showMessage({
              message: 'Diplôme',
              description: 'Votre diplôme a été téléchargé avec succès !',
              type: 'info',
              icon: 'success',
              duration: 3000,
              backgroundColor: palettes.notification.bg,
              color: palettes.notification.text,
            });
            break;
        }
      }
    })();
  };

  const set = async (data: any) => {
    await AsyncStorage.setItem('notification', JSON.stringify(data));
  };

  return {set, show};
};

export default useNotification;
