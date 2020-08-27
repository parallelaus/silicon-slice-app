/**
 * Wrapper for firebase.auth()
 */
import * as firebase from 'firebase/app'
import 'firebase/auth'

export async function signOut(): Promise<void> {
  await firebase.auth().signOut()
}

export async function signInWithEmailAndPassword(
  credentials: EmailPasswordCredentials
): Promise<void> {
  try {
    await firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
  } catch (error) {
    switch (error.code) {
      case 'auth/invalid-email':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        throw {
          error: 'unauthorised',
          message: 'Email or Password incorrect, please try again.'
        }

      case 'auth/user-disabled':
        throw {
          error: 'account-disabled',
          message: 'Your account has been disabled.'
        }
      default:
        throw error
    }
  }
}

export async function sendPasswordResetEmail(email: string): Promise<void> {
  await firebase.auth().sendPasswordResetEmail(email)
}

/**
 *
 */
export async function currentUser(): Promise<firebase.User | null> {
  return new Promise((resolve, reject) => {
    const user = firebase.auth().currentUser
    if (user) {
      resolve(user)
    } else {
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        unsubscribe()
        resolve(user)
      }, reject)
    }
  })
}

export async function signInWithGooglePopup(): Promise<void> {
  const provider = new firebase.auth.GoogleAuthProvider()

  try {
    await firebase.auth().signInWithPopup(provider)
  } catch (error) {
    throw {
      error: error.code,
      message: error.message
    }
  }
}
