import React, { useState } from 'react';
import EquipmentValidator from './EquipmentValidator';
import { useOfflineSync } from './useOfflineSync';

function App() {
  const { isOnline, addVisitToQueue } = useOfflineSync();
  const [validationPayload, setValidationPayload] = useState(null);

  // Equipamento de exemplo para demonstração
  const exampleEquipment = {
    qrCodeUuid: '12345-abcde',
    clientGps: { lat: -23.5505, long: -46.6333 } // São Paulo
  };

  const handleValidationSuccess = (payload: any) => {
    console.log('Validation successful! Payload:', payload);
    setValidationPayload(payload);
    // Adiciona os dados da visita à fila de sincronização
    addVisitToQueue({ validation: payload, analysis: { ph: 10.8, sulfite: 55 } });
  };

  return (
    <div className="App">
      <h1>FASINQUI Smart Water System</h1>
      <p>Network Status: {isOnline ? 'Online' : 'Offline'}</p>
      <hr />
      <h2>Equipment Validation</h2>
      {!validationPayload ? (
        <EquipmentValidator 
          selectedEquipment={exampleEquipment} 
          onValidationSuccess={handleValidationSuccess} 
        />
      ) : (
        <div>
          <h3>Validation Complete!</h3>
          <pre>{JSON.stringify(validationPayload, null, 2)}</pre>
          <p>Visit data has been queued for synchronization.</p>
        </div>
      )}
    </div>
  );
}

export default App;
