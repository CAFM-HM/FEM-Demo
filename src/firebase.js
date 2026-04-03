import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAZnmJeVJgiOM3n8tAt7KlorJeo3-q2LVo",
  authDomain: "fme-demo-e0f39.firebaseapp.com",
  projectId: "fme-demo-e0f39",
  storageBucket: "fme-demo-e0f39.firebasestorage.app",
  messagingSenderId: "405830702708",
  appId: "1:405830702708:web:38fbcae1780b13e8a26321",
  measurementId: "G-NFPS4GTDKB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

// In demo mode, EVERYONE who logs in is an admin
export const ADMINS = [];
export const isAdmin = (email) => true;

// Demo teacher UIDs — populated dynamically
export const UID_MAP = {};

// Custom display names
export const customTeacherNames = {};

export function teacherDisplayName(uid) {
  if (customTeacherNames[uid]) return customTeacherNames[uid];
  const email = UID_MAP[uid];
  if (email) {
    const name = email.split('@')[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
  return 'Demo Teacher';
}

// Load custom names from Firestore
import { doc, getDoc } from 'firebase/firestore';
getDoc(doc(db, 'config', 'teacherNames')).then(snap => {
  if (snap.exists()) {
    Object.assign(customTeacherNames, snap.data());
  }
}).catch(() => {});
