import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';

// Supondo que a função haversineDistance esteja definida em algum lugar
// function haversineDistance(coords1, coords2) { ... }

interface EquipmentValidatorProps {
  selectedEquipment: {
    qrCodeUuid: string;
    clientGps: { lat: number; long: number };
  };
  onValidationSuccess: (payload: any) => void;
}

const EquipmentValidator: React.FC<EquipmentValidatorProps> = ({ selectedEquipment, onValidationSuccess }) => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScan = (result: any) => {
    if (result) {
      const scannedUuid = result?.text;
      setScanResult(scannedUuid);
      validate(scannedUuid);
    }
  };

  const handleError = (err: any) => {
    console.error(err);
    setError('Failed to scan QR code.');
  }

  const validate = (scannedUuid: string) => {
    if (scannedUuid !== selectedEquipment.qrCodeUuid) {
      setError('QR Code does not match the selected equipment.');
      return;
    }

    setError(null);
    console.log('QR Code validated successfully.');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(`Current position: ${latitude}, ${longitude}`);

        // Dummy Haversine check
        // const distance = haversineDistance(
        //   { lat: latitude, long: longitude },
        //   selectedEquipment.clientGps
        // );
        const distance = 150; // Simulando distância para teste

        let audit_flag = false;
        if (distance > 200) {
          console.warn('Geolocation mismatch. Marking for audit.');
          audit_flag = true;
        }

        onValidationSuccess({ 
            scannedUuid, 
            gps: { lat: latitude, long: longitude },
            audit_flag 
        });
      },
      (geoError) => {
        console.error('Geolocation error:', geoError);
        setError('Could not get GPS location. Please enable location services.');
        // Mesmo com erro de GPS, podemos decidir continuar e marcar para auditoria
        onValidationSuccess({ 
            scannedUuid, 
            gps: null,
            audit_flag: true 
        });
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!scanResult ? (
        <QrScanner
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />
      ) : (
        <p>QR Code Scanned: {scanResult}. Validating...</p>
      )}
    </div>
  );
};

export default EquipmentValidator;
