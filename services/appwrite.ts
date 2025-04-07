import { Client, Account, ID } from "react-native-appwrite";

const {
  EXPO_PUBLIC_PROJECT_ID,
  EXPO_PUBLIC_PROJECT_PLATFORM,
  EXPO_PUBLIC_DATABASE_ID,
  EXPO_PUBLIC_VIDEO_COLLECTION_ID,
  EXPO_PUBLIC_USER_COLLECTION_ID,
  EXPO_PUBLIC_STORAGE_ID,
} = process.env;

const Appconfig = {
  platform: EXPO_PUBLIC_PROJECT_PLATFORM,
  projectId: EXPO_PUBLIC_PROJECT_ID,
  endpoint: "https://cloud.appwrite.io/v1",
  databaseId: EXPO_PUBLIC_DATABASE_ID,
  videCollectionId: EXPO_PUBLIC_VIDEO_COLLECTION_ID,
  userCollectionId: EXPO_PUBLIC_USER_COLLECTION_ID,
  storageId: EXPO_PUBLIC_STORAGE_ID,
};

const client = new Client()
  .setProject("67f3cc9c0038b1c55258")
  .setPlatform("com.eliaspereyra.shary")
  .setEndpoint("https://cloud.appwrite.io/v1");

const account = new Account(client);
