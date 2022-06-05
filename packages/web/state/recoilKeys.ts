/**
 * Recoilのatom key, selector keyを一元管理する
 */

export enum RecoilAtomKeys {
  THREAD = 'Thread',
  THREAD_USER = 'ThreadUser',
  USER_MEDIA = 'UserMedia',
}

export enum RecoilSelectorKeys {
  THREAD_MY_AVATAR = 'ThreadMyAvatar',
  THREAD_MY_ID = 'ThreadMyID',
  THREAD_STATUS = 'ThreadStatus',
  THREAD_USER_USERS = 'ThreadUserUsers',
  THREAD_USER_USER = 'ThreadUserUser',
  // USER_MEDIA_STREAM = 'UserMediaStream',
  // USER_MEDIA_STATUS = 'UserMediaStatus',
  // USER_MEDIA_IS_MUTED = 'UserMediaIsMuted',
  USER_MEDIA = 'UserMedia',
}
