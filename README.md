# Application Mon Maître Nageur

## Build & Run
`yarn global add expo-cli`
`yarn install`
`nvm install 16.14.2`
`nvm use 16.14.2;expo start`

## Log
`npx react-native log-android`

## Create new component DOM

Use `hoc Screen()` & `ConnectedLayout` if it's about a connected user

Otherwise, use `DefaultLayout`

```
import React from 'react';
import {ConnectedLayout} from '../components';
import Screen from '../hocs/Screen';

export const MonNouvelEcranScreen = Screen(({}) => {
  return (
    <ConnectedLayout>
      {/* ... */}
    </ConnectedLayout>
  );
});

export default MonNouvelEcranScreen;
```

## GraphQL

Copier/Coller le schema GraphQL de l'API dans le fichier `schema.graphql` de l'application.

## Déploiements

L'application est actuellement déployée sur iOS et Android.

### iOS

TODO

### Android

#### Montée de version

Android propose un système de version avec 2 éléments :
* un numéro de version interne : qu'on augmente à chaque déploiement
* un numéro de version externe : visible par les utilisateurs dans le store (c'est lui qu'on utilise aussi comme référence pour l'affichage dans l'app et pour le test de version dans l'api)

A chaque déploiement, il faut donc penser à modifier ces valeurs en fonction du cas.

- Modification du numéro interne  
  On incrément le numéro d'un à chaque déploiement :
  ```
  # android/app/build.gradle (l.139)
  
  versionCode 12
  ```
- Modification du numéro externe  
  Deux modifications à prévoir :
  - `android/app/build.gradle` (l.140)
  ```
  versionName "1.2"
  ```
  - `configs/app.ts` (l.2) : utilisé pour affichage dans l'app + signifier à l'api la version de l'app lors des appels
  ```
  export const ANDROID_APP_VERSION = '1.2';
  ```
  
#### Préparation du déploiement

Prérequis :
* Avoir installé l'environnement nécessaire avec AndroidStudio (cf. https://reactnative.dev/docs/environment-setup)
* NDK doit être installé, dans la version mentionnée dans `android/build.gradle` (l.9)  
* Avoir lancé un `yarn install` pour avoir tous les paquets nécessaires installés

Pour builder, il suffit ensuite de lancer
```
# Depuis la racine du projet mobile
cd android
./gradlew bundleRelease
```
Une fois le build terminé, un fichier .aab avec la release est disponible dans `android/app/build/outputs/bundle/release`.  
Il suffit maintenant de créer un build dans Google Play Console à partir de ce fichier (en l'important manuellement).

## Gestion des images sur le S3

Les images de l'application sont stockées sur un serveur S3, sur CleverCloud. 
Pour y accéder, il est nécessaire d'avoir 2 choses :
* s3cmd : outil en ligne de commande, à récupérer via `brew install s3cmd`
* s3cfg : le fichier de configuration qui va permettre de gérer l'authentification (présent à la racine de ce repo)

Règles à respecter :
* Les répertoires sont en anglais
* Les répertoires sont en minuscules
* Les répertoires ne comprennent pas d'espace (remplacer par des "-")

### Lister les buckets

    s3cmd -c s3cfg --host-bucket=cellar-c2.services.clever-cloud.com ls

### Lister le contenu d'un bucket (ses répertoires et images à la racine)

    s3cmd -c s3cfg --host-bucket=cellar-c2.services.clever-cloud.com ls s3://static.monmaitrenageur.app/

exemple de contenu d'un répertoire avec images

    s3cmd -c s3cfg --host-bucket=cellar-c2.services.clever-cloud.com ls s3://static.monmaitrenageur.app/products/mobile/

### Envoyer une image dans le S3

    s3cmd -c s3cfg --host-bucket=cellar-c2.services.clever-cloud.com put --acl-public jerome.png s3://static.monmaitrenageur.fr/coaches/iyr0sk.png

- Où s3cfg représente le fichier de configuration du S3 présent dans ce dépôt.
- On est obligé de forcer un HOST car sinon il y a un soucis de SSL.
- "--acl-public" permet de préciser que ce fichier est disponible publiquement.
