import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
  Storage,
  ImageGravity,
} from "react-native-appwrite";
import { Appconfig } from "./appwrite.config";
import { AppwriteFile, VideoPost } from "@/types/videoPost";

const client = new Client()
  .setProject(Appconfig.projectId!)
  .setPlatform(Appconfig.platform!)
  .setEndpoint(Appconfig.endpoint!);

const account = new Account(client);
const avatar = new Avatars(client);
const database = new Databases(client);
const storage = new Storage(client);

/**
 * Crea un nuevo usuario con email y password. A su vez, crea un 
avatar con los iniciales del nombre.
 *
 * @param params: email, password, fullname
 * @returns Document user
 */
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
    // La instancia 'account' se encarga de crear un nuevo usuario
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
  } catch (error: any) {
    console.error("Hubo un error al crear el usuario", error);
    if (error.code === 409) {
      throw new Error("El usuario ya existe");
    }
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

/**
 * Inicia una nueva sesion con email y password.
 *
 * @param email
 * @param password
 * @returns session
 */
export const logIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (e) {
    console.error("Hubo un error al iniciar sesión", e);
  }
};

/**
 * Obtiene el usuario actual logueado en formato de documento.
 *
 * @returns user document
 */
export const getCurrentUser = async () => {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await database.listDocuments(
      Appconfig.databaseId!,
      Appconfig.userCollectionId!,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.error("Hubo un error al obtener el usuario", error);
    return null;
  }
};

// TODO: experimentar dar la opcion de cerrar todas las sesiones en todos los dispositivos conectados.
/**
 * Cierra la sesion actual del usuario.
 *
 * @returns session
 */
export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (e) {
    console.error("Hubo un error al cerrar sesión", e);
  }
};

/**
 * Obtiene todos los posts de la base de datos.
 *
 * @returns posts
 */
export const getAllPosts = async () => {
  try {
    const posts = database.listDocuments(
      Appconfig.databaseId!,
      Appconfig.videCollectionId!
    );

    return (await posts).documents;
  } catch (error) {
    console.error("Hubo un error al obtener los posts", error);
  }
};

/**
 * Obtiene todos los posts de un usuario.
 *
 * @param userId
 * @returns posts
 */
export const getUserPosts = async (userId: string) => {
  try {
    const posts = database.listDocuments(
      Appconfig.databaseId!,
      Appconfig.videCollectionId!,
      [Query.equal("creator", userId)]
    );

    return (await posts).documents;
  } catch (error) {
    console.error("Hubo un error al obtener los posts", error);
    throw new Error("Hubo un error al obtener los posts", {
      cause: error,
    });
  }
};

/**
 * En el caso de que el archivo sea una imagen, obtiene el preview de una imagen de tipo .jpg, .png y .gif.
 * Si es un video obtiene el contenido del archivo.
 *
 * Referencia: https://appwrite.io/docs/references/cloud/client-web/storage
 * @param fileId
 * @param type
 * @returns url del archivo
 */
export const getFilePreview = async (fileId: string, type: string) => {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(Appconfig.storageId!, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        Appconfig.storageId!,
        fileId,
        2000,
        2000,
        ImageGravity.Center,
        100
      );
    } else {
      throw new Error("El tipo de archivo es invalido");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.error("Hubo un error al obtener el archivo", error);
    throw new Error("Hubo un error al obtener el archivo", {
      cause: error,
    });
  }
};

/**
 * Sube un archivo del tipo específico de Appwrite. Una vez que se sube el archivo, se utiliza la función getFilePreview para obtener la url del archivo.
 * Se usa ese url para mostrar el archivo en la pantalla.
 *
 * Referencia: https://appwrite.io/docs/references/cloud/client-web/storage
 *
 * @param {Object} params
 * @param {AppwriteFile} params.file
 * @param {string} params.type
 * @returns url
 */
export const uploadFile = async ({
  file,
  type,
}: {
  file: AppwriteFile;
  type: string;
}) => {
  if (!file) return;

  try {
    const uploadedFile = await storage.createFile(
      Appconfig.storageId!,
      ID.unique(),
      file
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);

    return fileUrl;
  } catch (error) {
    throw new Error("Hubo un error al subir el archivo", {
      cause: error,
    });
  }
};
