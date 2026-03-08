import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Heart, Stethoscope, User, ArrowRight, Shield, Clock, MessageSquare } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/lib/mock-data';
import { useRouter } from 'expo-router';

export default function LoginPage() {
    const [selectedRole, setSelectedRole] = useState<UserRole>('patient');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    const handleLogin = () => {
        login(selectedRole);
        router.replace('/');
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', padding: 24 }}>
            <View className="w-full max-w-md">

                {/* Logo */}
                <View className="items-center mb-8">
                    <View className="items-center justify-center w-16 h-16 rounded-2xl bg-slate-900 mb-4">
                        <Heart size={32} color="#ffffff" />
                    </View>
                    <Text className="text-2xl font-bold text-slate-900">MediCare</Text>
                    <Text className="text-slate-500 text-sm mt-1">Your Health, Our Priority</Text>
                </View>

                {/* Role Toggle */}
                <View className="bg-slate-100 rounded-2xl p-1 flex-row mb-6">
                    {(['patient', 'doctor'] as UserRole[]).map((role) => (
                        <TouchableOpacity
                            key={role}
                            onPress={() => setSelectedRole(role)}
                            className={`flex-1 flex-row items-center justify-center gap-2 py-3 rounded-xl ${selectedRole === role ? 'bg-white shadow-sm' : ''
                                }`}
                        >
                            {role === 'patient' ? <User size={16} color={selectedRole === role ? "#0284c7" : "#64748b"} /> : <Stethoscope size={16} color={selectedRole === role ? "#0284c7" : "#64748b"} />}
                            <Text className={`text-sm font-semibold ${selectedRole === role ? 'text-slate-900' : 'text-slate-500'}`}>
                                {role === 'patient' ? 'Patient' : 'Doctor'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Login Form */}
                <View className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
                    <View className="mb-4">
                        <Text className="text-sm font-medium text-slate-900 mb-1.5">Email</Text>
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            placeholder={selectedRole === 'doctor' ? 'doctor@medicare.com' : 'patient@email.com'}
                            placeholderTextColor="#94a3b8"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm"
                        />
                    </View>

                    <View className="mb-4">
                        <Text className="text-sm font-medium text-slate-900 mb-1.5">Password</Text>
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            placeholder="••••••••"
                            placeholderTextColor="#94a3b8"
                            secureTextEntry
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm"
                        />
                    </View>

                    <View className="flex-row items-center justify-between text-sm mb-4 mt-2">
                        <View className="flex-row items-center gap-2">
                            <View className="w-4 h-4 rounded border border-slate-300" />
                            <Text className="text-slate-500 text-sm">Remember me</Text>
                        </View>
                        <TouchableOpacity>
                            <Text className="text-slate-900 font-medium text-sm">Forgot password?</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        onPress={handleLogin}
                        className="w-full bg-slate-900 py-3.5 rounded-xl flex-row items-center justify-center gap-2"
                    >
                        <Text className="text-white font-semibold text-sm">
                            Sign In as {selectedRole === 'doctor' ? 'Doctor' : 'Patient'}
                        </Text>
                        <ArrowRight size={16} color="#ffffff" />
                    </TouchableOpacity>
                </View>

                {/* Features */}
                <View className="mt-8 flex-row justify-between">
                    {[
                        { icon: Shield, label: 'Secure' },
                        { icon: Clock, label: '24/7 Access' },
                        { icon: MessageSquare, label: 'Live Chat' },
                    ].map(({ icon: Icon, label }) => (
                        <View key={label} className="items-center gap-1.5 flex-1">
                            <View className="w-10 h-10 rounded-xl bg-slate-100 items-center justify-center">
                                <Icon size={16} color="#0284c7" />
                            </View>
                            <Text className="text-xs font-medium text-slate-500 mt-1">{label}</Text>
                        </View>
                    ))}
                </View>

            </View>
        </ScrollView>
    );
}
