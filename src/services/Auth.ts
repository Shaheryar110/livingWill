import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  ConfigureParams,
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import {Alert} from 'react-native';
import {Toast} from 'react-native-toast-notifications';
import {appleAuth} from '@invertase/react-native-apple-authentication';

export const createUser = async (
  email: string,
  passowrd: string,
  name: string,
  dob: string,
) => {
  auth()
    .createUserWithEmailAndPassword(email, passowrd)
    .then(data => {
      createUserInDatabase(
        data.user.uid,
        name,
        email,
        data.user.phoneNumber,
        false,
      );
      Toast.show('signed in!', {
        type: 'success',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        Toast.show('That email address is already in use', {
          type: 'error',
          placement: 'bottom',
          duration: 4000,
          animationType: 'slide-in',
        });
      }

      if (error.code === 'auth/invalid-email') {
        Toast.show('That email address is invalid!', {
          type: 'error',
          placement: 'bottom',
          duration: 4000,
          animationType: 'slide-in',
        });
      }

      console.error(error);
    });
};
export const logOut = async () => {
  auth()
    .signOut()
    .then(() =>
      Toast.show('Sign out successfull', {
        type: 'success',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      }),
    );
};
export const createUserInDatabase = (
  uid: string,
  fullName: string,
  email: string,
  phone: string | null,
  isPremium: boolean,
) => {
  return firestore().collection('users').doc(uid).set({
    uid,
    fullName,
    email,
    phone,
    createdAt: firestore.FieldValue.serverTimestamp(),
    isPremium,
  });
};
export const signIn = async (email: string, password: string) => {
  if (!email?.trim() || !password) {
    Toast.show('Email Or Password Couldnt be empty', {
      type: 'error',
      placement: 'bottom',
      duration: 4000,
      animationType: 'slide-in',
    });
    return;
  }

  return auth().signInWithEmailAndPassword(email.trim(), password);
};

export const getUserById = async (uid: string) => {
  return firestore()
    .collection('users')
    .doc(uid)
    .get()
    .then(user => user.data())
    .catch(err => console.log(err));
};
export interface ExtendedConfigureParams extends ConfigureParams {
  forceConsentPrompt?: boolean;
}
export const onGoogleButtonPress = async () => {
  GoogleSignin.configure({
    webClientId:
      '86900280068-vkfqi65go9vk60ctjthsj9crd1c40ggb.apps.googleusercontent.com',
    offlineAccess: true,
    hostedDomain: '',
    forceConsentPrompt: true,
  } as ExtendedConfigureParams);
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({
    showPlayServicesUpdateDialog: true,
  });
  // Get the users ID token
  try {
    const userInfo = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(
      userInfo?.idToken,
    );
    return auth()
      .signInWithCredential(googleCredential)
      .then(async data => {
        const user = await getUserById(data.user.uid);
        if (user?.uid) {
          Toast.show(
            `Welcome Back! Hi ${data.user.displayName} Welcome back to Living Will.`,
            {
              type: 'success',
              placement: 'bottom',
              duration: 4000,
              animationType: 'slide-in',
            },
          );
          return;
        } else {
          if (data?.user) {
            createUserInDatabase(
              data.user?.uid,
              data?.user?.displayName || '',
              data?.user?.email || '',
              data?.user?.phoneNumber || '',
              false,
            )
              .then(_ => console.log('user Created In Database'))
              .catch(err => console.log(err));
          }
        }
      })
      .catch(e => console.log(e));
  } catch (error) {
    console.log(error);
  }

  // Create a Google credential with the token

  // Sign-in the user with the credential
};

export async function onAppleButtonPress() {
  // Start the sign-in request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    // As per the FAQ of react-native-apple-authentication, the name should come first in the following array.
    // See: https://github.com/invertase/react-native-apple-authentication#faqs
    requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
  });

  // Ensure Apple returned a user identityToken
  if (!appleAuthRequestResponse.identityToken) {
    throw new Error('Apple Sign-In failed - no identify token returned');
  }

  // Create a Firebase credential from the response
  const {identityToken, nonce} = appleAuthRequestResponse;
  const appleCredential = auth.AppleAuthProvider.credential(
    identityToken,
    nonce,
  );
  // Sign the user in with the credential
  return auth()
    .signInWithCredential(appleCredential)
    .then(async data => {
      const user = await getUserById(data.user.uid);
      if (user?.uid) {
        Toast.show(
          `Welcome Back! Hi ${data.user.displayName} Welcome back to Living Will.`,
          {
            type: 'success',
            placement: 'bottom',
            duration: 4000,
            animationType: 'slide-in',
          },
        );
        return;
      } else {
        createUserInDatabase(
          data.user.uid,
          data.user.displayName || '',
          data.user.email || '',
          '',

          false,
        )
          .then(_ => console.log('user Created In Database'))
          .catch(err => console.log(err));
      }
    });
}

export const updateUser = async (
  uid: string,
  obj: {
    fullName: string;
    email: string;
    // phone: string;
  },
) => {
  const {fullName, email} = obj;
  firestore()
    .collection('users')
    .doc(uid)
    .update({
      fullName: fullName,
      email: email,
      // phone: phone,
    })
    .then(() => {
      Toast.show('User Updated Successfully', {
        type: 'success',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
    })
    .catch(err => {
      Toast.show('User Didnt Updated', {
        type: 'error',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
    });
};
