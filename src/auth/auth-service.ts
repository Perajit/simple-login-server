import { UserProfile } from './models';

const userCredentials = [
  {
    userName: 'user1@mail.com',
    password: 'P@ssword1',
  },
  {
    userName: 'user2@mail.com',
    password: 'P@ssword2',
  },
];

const userProfiles: UserProfile[] = [
  {
    userId: 1,
    userName: 'user1@mail.com',
    displayName: 'display-name-1',
    organization: 'a',
    group: 'a-1',
    roles: ['admin'],
  },
  {
    userId: 1,
    userName: 'user2@mail.com',
    displayName: 'display-name-2',
    organization: 'a',
    group: 'a-1',
    roles: ['viwer'],
  },
];

export async function validateUserCredential(userName: string, password: string): Promise<UserProfile> {
  // this is just a hardcoded version
  const matchedCredential = userCredentials.find(item => {
    const isUserNameMatched = item.userName === userName;
    if (!isUserNameMatched) {
      return false;
    }
    const isPasswordMatched = item.password === password;
    if (!isPasswordMatched) {
      return false;
    }

    return true
  });

  if (matchedCredential) {
    // assume that there's always a matched user profile
    return userProfiles.find(item => item.userName === userName) ?? {} as UserProfile;
  } else {
    throw new Error('Invalid username or password');
  }
}
