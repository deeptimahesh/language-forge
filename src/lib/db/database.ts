import { Db } from 'mongodb';
import clientPromise from './mongodb';

// Provide easy access to DB and collections

// Database Name: Get DB name from env or use default
const DB_NAME = process.env.MONGODB_DB || 'language-forge';

/**
 * Get a database connection
 * @returns Promise that resolves to MongoDB database instance
 */
export async function getDatabase(): Promise<Db> {
  const client = await clientPromise;
  return client.db(DB_NAME);
}

/**
 * Get a collection from the database
 * @param collectionName - Name of the collection to access
 * @returns Promise that resolves to the collection
 */
export async function getCollection(collectionName: string) {
  const db = await getDatabase();
  return db.collection(collectionName);
}

/**
 * Collections available in the database
 */
export const Collections = {
  USERS: 'users',
  PROJECTS: 'projects',
  PHONOLOGY: 'phonology',
  LEXICON: 'lexicon',
  MORPHOLOGY: 'morphology',
  SYNTAX: 'syntax',
  CULTURE: 'culture',
}; 