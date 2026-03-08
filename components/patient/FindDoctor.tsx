import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Search, Star, MapPin, Clock } from 'lucide-react-native';
import { mockDoctors, Doctor } from '@/lib/mock-data';

const specs = ['All', 'Cardiology', 'Dermatology', 'Neurology', 'Orthopedics', 'Pediatrics'];

interface Props { onSelectDoctor: (d: Doctor) => void; }

export default function FindDoctor({ onSelectDoctor }: Props) {
    const [search, setSearch] = useState('');
    const [activeSpec, setActiveSpec] = useState('All');

    const filtered = mockDoctors.filter(d => {
        const matchSearch = !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.specialization.toLowerCase().includes(search.toLowerCase());
        const matchSpec = activeSpec === 'All' || d.specialization.includes(activeSpec.replace('ics', '').replace('gy', ''));
        return matchSearch && matchSpec;
    });

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
            <Text style={{ fontSize: 20, fontWeight: '700', color: '#0284c7', marginBottom: 4 }}>Find a Doctor</Text>
            <Text style={{ fontSize: 14, color: '#64748b', marginBottom: 16 }}>{mockDoctors.length} specialists available</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#f1f5f9', borderRadius: 12, paddingHorizontal: 12, marginBottom: 16 }}>
                <Search size={16} color="#64748b" />
                <TextInput value={search} onChangeText={setSearch} placeholder="Search doctors..." placeholderTextColor="#94a3b8" style={{ flex: 1, paddingVertical: 10, fontSize: 14, color: '#0284c7' }} />
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                    {specs.map(s => (
                        <TouchableOpacity key={s} onPress={() => setActiveSpec(s)} activeOpacity={0.7} style={{ paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: activeSpec === s ? '#0ea5e9' : '#f1f5f9' }}>
                            <Text style={{ fontSize: 12, fontWeight: '600', color: activeSpec === s ? '#fff' : '#64748b' }}>{s}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {filtered.map((doc) => (
                <TouchableOpacity key={doc.id} onPress={() => onSelectDoctor(doc)} activeOpacity={0.7} style={{ backgroundColor: '#fff', borderRadius: 16, padding: 14, borderWidth: 1, borderColor: '#f1f5f9', flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <Image source={{ uri: doc.avatar }} style={{ width: 56, height: 56, borderRadius: 14 }} />
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontWeight: '600', fontSize: 14, color: '#0284c7' }}>{doc.name}</Text>
                        <Text style={{ fontSize: 12, color: '#0ea5e9', fontWeight: '500' }}>{doc.specialization}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 4 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}><Star size={12} color="#ca8a04" /><Text style={{ fontSize: 12, fontWeight: '600', color: '#0284c7' }}>{doc.rating}</Text></View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}><MapPin size={12} color="#64748b" /><Text style={{ fontSize: 11, color: '#64748b' }}>{doc.distance}</Text></View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}><Clock size={12} color="#64748b" /><Text style={{ fontSize: 11, color: '#64748b' }}>{doc.availableSlots[0]}</Text></View>
                        </View>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 16, fontWeight: '700', color: '#0284c7' }}>₹{doc.consultationFee}</Text>
                        <Text style={{ fontSize: 10, color: '#64748b' }}>fee</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}
