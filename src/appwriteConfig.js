import { Client, Databases, Account } from "appwrite";

const client = new Client();

export const PROJECT_ID =
  import.meta.env.VITE_APPWRITE_PROJECT_ID || "662a12899ce370570506";

export const DATABASES_ID =
  import.meta.env.VITE_APPWRITE_DATABASES_ID || "662a13269bee713403b3";

export const COLLECTION_MESSAGE_ID =
  import.meta.env.VITE_APPWRITE_COLLECTION_MESSAGE_ID || "662a133b83ddf962f6f3";

export const AppwrietEndPointURL =
  import.meta.env.VITE_APPWRITE_URL || "https://cloud.appwrite.io/v1";

client.setEndpoint(AppwrietEndPointURL).setProject(PROJECT_ID);

// Initialize services
export const databases = new Databases(client);
export const account = new Account(client);

export default client;
