const {
  EXPO_PUBLIC_PROJECT_ID,
  EXPO_PUBLIC_PROJECT_PLATFORM,
  EXPO_PUBLIC_DATABASE_ID,
  EXPO_PUBLIC_VIDEO_COLLECTION_ID,
  EXPO_PUBLIC_USER_COLLECTION_ID,
  EXPO_PUBLIC_STORAGE_ID,
} = process.env;

export const Appconfig = {
  platform: EXPO_PUBLIC_PROJECT_PLATFORM,
  projectId: EXPO_PUBLIC_PROJECT_ID,
  endpoint: "https://cloud.appwrite.io/v1",
  databaseId: EXPO_PUBLIC_DATABASE_ID,
  videoCollectionId: EXPO_PUBLIC_VIDEO_COLLECTION_ID,
  userCollectionId: EXPO_PUBLIC_USER_COLLECTION_ID,
  storageId: EXPO_PUBLIC_STORAGE_ID,
};
