export interface Notification {
    id: number;
    title: string;
    message: string;
    time: string;
    read: boolean;
    type: 'test_result' | 'appointment' | 'uv_warning' | 'medicine' | 'reminder' | 'biopsy' | 'treatment' | 'insurance' | 'medication' | 'followup' | 'emergency' | 'vaccination' | 'consultation' | 'prescription' | 'lab_result';
  }