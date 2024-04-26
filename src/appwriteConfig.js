import { Client, Databases,Account } from "appwrite";

const client = new Client();

export const PROJECT_ID= "662a12899ce370570506"
export const DATABASES_ID= "662a13269bee713403b3"
export const COLLECTION_MESSAGE_ID= "662a133b83ddf962f6f3"


client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("662a12899ce370570506");

export const databases = new Databases(client);
export const account = new Account(client)



export default client;
