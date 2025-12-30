import { useState, useEffect } from 'react';
import { openDB, DBSchema, IDBPDatabase } from 'idb';

// Defina a estrutura dos dados que você irá armazenar
interface VisitData {
  id: string; // uuid
  timestamp: number;
  payload: any; // Dados da visita
  synced: boolean;
}

// Defina o schema do banco de dados
interface FasinquiDB extends DBSchema {
  pendingVisits: {
    key: string;
    value: VisitData;
  };
}

let db: IDBPDatabase<FasinquiDB>;

async function getDb() {
  if (!db) {
    db = await openDB<FasinquiDB>('fasinqui-db', 1, {
      upgrade(db) {
        db.createObjectStore('pendingVisits', { keyPath: 'id' });
      },
    });
  }
  return db;
}

export const useOfflineSync = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      console.log('Became online, attempting to sync...');
      setIsOnline(true);
      syncPendingVisits();
    };

    const handleOffline = () => {
      console.log('Became offline.');
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Tenta sincronizar na montagem inicial, caso haja algo pendente.
    if (navigator.onLine) {
      syncPendingVisits();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const addVisitToQueue = async (visitData: any) => {
    const db = await getDb();
    const visit: VisitData = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      payload: visitData,
      synced: false,
    };

    await db.put('pendingVisits', visit);
    console.log('Visit saved to local queue.', visit);

    // Se estiver online, tenta sincronizar imediatamente.
    if (navigator.onLine) {
        await syncPendingVisits();
    }
  };

  const syncPendingVisits = async () => {
    const db = await getDb();
    const pending = await db.getAll('pendingVisits');
    const unsynced = pending.filter(v => !v.synced);

    if (unsynced.length === 0) {
      console.log('No pending visits to sync.');
      return;
    }

    console.log(`Syncing ${unsynced.length} pending visits...`);

    for (const visit of unsynced) {
      try {
        // Simula uma chamada de API
        const response = await fetch('/api/visits', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(visit.payload),
        });

        if (response.ok) {
          console.log(`Visit ${visit.id} synced successfully.`);
          // Atualiza o status no IndexedDB
          await db.put('pendingVisits', { ...visit, synced: true });
        } else {
          console.error(`Failed to sync visit ${visit.id}. Server responded with ${response.status}`);
        }
      } catch (error) {
        console.error(`Error syncing visit ${visit.id}:`, error);
        // A visita permanecerá no estado não sincronizado para a próxima tentativa
      }
    }
  };

  return { isOnline, addVisitToQueue };
};
