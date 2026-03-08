import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole } from '@/lib/mock-data';

export interface PatientProfile {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  height: string;
  weight: string;
  address: string;
  city: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  allergies: string;
  chronicConditions: string;
  currentMedications: string;
  pastSurgeries: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
}

export const emptyProfile: PatientProfile = {
  fullName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  gender: '',
  bloodGroup: '',
  height: '',
  weight: '',
  address: '',
  city: '',
  emergencyContactName: '',
  emergencyContactPhone: '',
  allergies: '',
  chronicConditions: '',
  currentMedications: '',
  pastSurgeries: '',
  insuranceProvider: '',
  insurancePolicyNumber: '',
};

interface AuthContextType {
  isLoggedIn: boolean;
  role: UserRole | null;
  userName: string;
  patientProfile: PatientProfile;
  isProfileComplete: boolean;
  updatePatientProfile: (profile: PatientProfile) => void;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<UserRole | null>(null);
  const [patientProfile, setPatientProfile] = useState<PatientProfile>(emptyProfile);

  const isProfileComplete = patientProfile.fullName.trim() !== '';
  const userName = patientProfile.fullName || 'New Patient';

  const updatePatientProfile = (profile: PatientProfile) => {
    setPatientProfile(profile);
  };

  const login = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setRole(null);
    setPatientProfile(emptyProfile);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, userName, patientProfile, isProfileComplete, updatePatientProfile, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
