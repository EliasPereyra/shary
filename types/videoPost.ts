export interface AppwriteFile {
  name: string;
  uri: string;
  type: string;
  size: number;
}

export interface VideoPost {
  title: string;
  thumbnailUri: AppwriteFile;
  videoUri: AppwriteFile;
  description: string;
  creator: string;
}
