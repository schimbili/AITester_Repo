import { openDB } from 'idb';

const DB_NAME = 'JobTrackerDB';
const STORE_NAME = 'jobs';
const DB_VERSION = 1;

export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex('status', 'status');
        store.createIndex('company', 'company');
      }
    },
  });
};

export const getAllJobs = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

export const addJob = async (job) => {
  const db = await initDB();
  const id = await db.add(STORE_NAME, {
    ...job,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  return { ...job, id };
};

export const updateJob = async (job) => {
  const db = await initDB();
  await db.put(STORE_NAME, {
    ...job,
    updatedAt: new Date().toISOString(),
  });
  return job;
};

export const deleteJob = async (id) => {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
};

export const clearAllJobs = async () => {
  const db = await initDB();
  await db.clear(STORE_NAME);
};

export const importJobs = async (jobs) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await tx.store.clear();
  for (const job of jobs) {
    // Remove ID to let it be auto-incremented if it's already used or conflicting
    // better yet, just put them if they have IDs
    await tx.store.put(job);
  }
  await tx.done;
};
