import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Calendar, Clock, Video, MapPin, ChevronRight } from 'lucide-react-native';
import { mockAppointments, Appointment } from '@/lib/mock-data';
import { useAuth } from '@/contexts/AuthContext';

interface Props { onSelectAppointment?: (apt: Appointment) => void; }

export default function AppointmentsList({ onSelectAppointment }: Props) {
    const { role } = useAuth();
    const [filter, setFilter] = useState('all');
    const filtered = filter === 'all' ? mockAppointments : mockAppointments.filter(a => a.status === filter);

    const statusColors: Record<string, { bg: string; text: string }> = {
        upcoming: { bg: '#dbeafe', text: '#2563eb' },
        completed: { bg: '#dcfce7', text: '#16a34a' },
        cancelled: { bg: '#fef2f2', text: '#dc2626' },
    };

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
            <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 20, fontWeight: '700', color: '#0284c7' }}>Appointments</Text>
                <Text style={{ fontSize: 14, color: '#64748b' }}>{mockAppointments.length} total</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                    {['all', 'upcoming', 'completed', 'cancelled'].map(f => (
                        <TouchableOpacity key={f} onPress={() => setFilter(f)} activeOpacity={0.7} style={{ paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: filter === f ? '#0ea5e9' : '#f1f5f9' }}>
                            <Text style={{ fontSize: 12, fontWeight: '600', color: filter === f ? '#fff' : '#64748b', textTransform: 'capitalize' }}>{f}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {filtered.map((apt) => {
                const colors = statusColors[apt.status] || statusColors.upcoming;
                return (
                    <TouchableOpacity key={apt.id} onPress={() => onSelectAppointment?.(apt)} activeOpacity={0.7} style={{ backgroundColor: '#fff', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#f1f5f9', flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                        <Image source={{ uri: apt.avatar }} style={{ width: 48, height: 48, borderRadius: 12 }} />
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontWeight: '600', fontSize: 14, color: '#0284c7' }}>{role === 'doctor' ? apt.patientName : apt.doctorName}</Text>
                            <Text style={{ fontSize: 12, color: '#64748b' }}>{apt.specialization}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}><Calendar size={12} color="#64748b" /><Text style={{ fontSize: 11, color: '#64748b' }}>{apt.date}</Text></View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}><Clock size={12} color="#64748b" /><Text style={{ fontSize: 11, color: '#64748b' }}>{apt.time}</Text></View>
                            </View>
                        </View>
                        <View style={{ alignItems: 'flex-end', gap: 4 }}>
                            <View style={{ paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, backgroundColor: colors.bg }}>
                                <Text style={{ fontSize: 10, fontWeight: '600', color: colors.text, textTransform: 'capitalize' }}>{apt.status}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                                {apt.type === 'Video Call' ? <Video size={12} color="#64748b" /> : <MapPin size={12} color="#64748b" />}
                                <Text style={{ fontSize: 10, color: '#64748b' }}>{apt.type}</Text>
                            </View>
                            <ChevronRight size={14} color="#94a3b8" />
                        </View>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
}
