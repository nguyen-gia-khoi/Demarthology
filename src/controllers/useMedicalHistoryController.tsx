import {useState} from 'react';
import {UserMedical} from "../models/user-medical";

function useMedicalHistoryController() {
    const [medicalHistory, setMedicalHistory] = useState<UserMedical[]>([])


    return [medicalHistory];
}

export default useMedicalHistoryController;