import { Client, Account, ID, Avatars, Databases } from "react-native-appwrite";

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
  videCollectionId: EXPO_PUBLIC_VIDEO_COLLECTION_ID,
  userCollectionId: EXPO_PUBLIC_USER_COLLECTION_ID,
  storageId: EXPO_PUBLIC_STORAGE_ID,
};

const client = new Client()
  .setProject(Appconfig.projectId!)
  .setPlatform(Appconfig.platform!)
  .setEndpoint(Appconfig.endpoint!);

const account = new Account(client);
const avatar = new Avatars(client);
const database = new Databases(client);

export const createUser = async ({
  email,
  password,
  fullname,
}: {
  email: string;
  password: string;
  fullname: string;
}) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      fullname
    );
    if (!newAccount) throw Error;

    const avatarInitials = avatar.getInitials(fullname);
    if (!avatarInitials) console.warn("Hubo un error al crear el avatar");

    await logIn(email, password);

    const newUser = await database.createDocument(
      Appconfig.databaseId!,
      Appconfig.userCollectionId!,
      ID.unique(),
      {
        $id: newAccount.$id,
        name: fullname,
        email,
        avatar: avatarInitials,
      }
    );
    if (!newUser) throw Error;

    return newUser;
  } catch (e) {
    console.error("Hubo un error al crear el usuario", e);
  }
};

export const getAccount = async () => {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (e) {
    console.error("Hubo un error al obtener el usuario", e);
  }
};

export const logIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    if (!session) throw Error;

    return session;
  } catch (e) {
    console.error("Hubo un error al iniciar sesión", e);
  }
};
