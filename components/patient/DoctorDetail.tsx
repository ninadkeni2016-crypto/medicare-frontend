import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { ArrowLeft, Star, MapPin, Clock, Calendar, Users, Award, Video, CheckCircle } from 'lucide-react-native';
import { Doctor } from '@/lib/mock-data';

interface DoctorDetailProps { doctor: Doctor; onBack: () => void; onBook: () => void; }

const dates = [
    { label: 'Today', value: 'Mar 8' },
    { label: 'Tomorrow', value: 'Mar 9' },
    { label: 'Mon', value: 'Mar 10' },
    { label: 'Tue', value: 'Mar 11' },
    { label: 'Wed', value: 'Mar 12' },
];

export default function DoctorDetail({ doctor, onBack, onBook }: DoctorDetailProps) {
    const [selectedDate, setSelectedDate] = useState(dates[0].value);
    const [selectedSlot, setSelectedSlot] = useState('');
    const [selectedType, setSelectedType] = useState<'In-Person' | 'Video Call'>('In-Person');
    const [booked, setBooked] = useState(false);

    const handleBook = () => {
        if (!selectedSlot) return;
        setBooked(true);
        setTimeout(() => onBook(), 1500);
    };

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <TouchableOpacity onPress={onBack} activeOpacity={0.7} style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: '#f1f5f9', alignItems: 'center', justifyContent: 'center' }}>
                    <ArrowLeft size={16} color="#334155" />
                </TouchableOpacity>
                <Text style={{ flex: 1, fontSize: 18, fontWeight: '700', color: '#0284c7' }}>Doctor Profile</Text>
            </View>

            <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#f1f5f9', alignItems: 'center', marginBottom: 16 }}>
                <Image source={{ uri: doctor.avatar }} style={{ width: 80, height: 80, borderRadius: 16, marginBottom: 12 }} />
                <Text style={{ fontWeight: '700', fontSize: 18, color: '#0284c7' }}>{doctor.name}</Text>
                <Text style={{ fontSize: 14, color: '#0ea5e9', fontWeight: '500' }}>{doctor.specialization}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 8 }}>
                    <Star size={16} color="#ca8a04" />
                    <Text style={{ fontSize: 14, fontWeight: '700', color: '#0284c7' }}>{doctor.rating}</Text>
                    <Text style={{ fontSize: 12, color: '#64748b' }}>({doctor.reviews} reviews)</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 8, marginTop: 16, width: '100%' }}>
                    {[
                        { icon: Award, label: 'Experience', value: doctor.experience },
                        { icon: Users, label: 'Patients', value: String(doctor.patients) },
                        { icon: MapPin, label: 'Distance', value: doctor.distance },
                    ].map(({ icon: Icon, label, value }) => (
                        <View key={label} style={{ flex: 1, backgroundColor: '#f8fafc', borderRadius: 12, padding: 10, alignItems: 'center' }}>
                            <Icon size={16} color="#64748b" />
                            <Text style={{ fontSize: 10, color: '#64748b', marginTop: 4 }}>{label}</Text>
                            <Text style={{ fontSize: 14, fontWeight: '700', color: '#0284c7' }}>{value}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#f1f5f9', marginBottom: 16 }}>
                <Text style={{ fontWeight: '700', fontSize: 14, color: '#0284c7', marginBottom: 8 }}>About</Text>
                <Text style={{ fontSize: 12, color: '#64748b', lineHeight: 18 }}>
                    {doctor.name} is a highly experienced {doctor.specialization} with {doctor.experience} of practice. Known for providing compassionate care and using the latest treatment methods. Has treated over {doctor.patients} patients with excellent outcomes.
                </Text>
            </View>

            <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#f1f5f9', marginBottom: 16 }}>
                <Text style={{ fontWeight: '700', fontSize: 14, color: '#0284c7', marginBottom: 12 }}>Consultation Type</Text>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                    {([
                        { type: 'In-Person' as const, icon: MapPin, desc: 'Visit clinic' },
                        { type: 'Video Call' as const, icon: Video, desc: 'Online consult' },
                    ]).map(({ type, icon: Icon, desc }) => (
                        <TouchableOpacity key={type} onPress={() => setSelectedType(type)} activeOpacity={0.7} style={{ flex: 1, padding: 12, borderRadius: 12, borderWidth: 2, borderColor: selectedType === type ? '#0ea5e9' : '#e2e8f0', backgroundColor: selectedType === type ? '#f0fdfa' : '#fff', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <Icon size={16} color={selectedType === type ? '#0ea5e9' : '#64748b'} />
                            <View>
                                <Text style={{ fontSize: 12, fontWeight: '600', color: '#0284c7' }}>{type}</Text>
                                <Text style={{ fontSize: 10, color: '#64748b' }}>{desc}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#f1f5f9', marginBottom: 16 }}>
                <Text style={{ fontWeight: '700', fontSize: 14, color: '#0284c7', marginBottom: 12 }}>Select Date</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                        {dates.map(d => (
                            <TouchableOpacity key={d.value} onPress={() => setSelectedDate(d.value)} activeOpacity={0.7} style={{ paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, minWidth: 70, alignItems: 'center', backgroundColor: selectedDate === d.value ? '#0ea5e9' : '#f1f5f9' }}>
                                <Text style={{ fontSize: 10, fontWeight: '500', color: selectedDate === d.value ? 'rgba(255,255,255,0.8)' : '#64748b' }}>{d.label}</Text>
                                <Text style={{ fontSize: 12, fontWeight: '700', color: selectedDate === d.value ? '#fff' : '#0284c7' }}>{d.value}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>

            <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#f1f5f9', marginBottom: 16 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                    <Clock size={16} color="#0284c7" />
                    <Text style={{ fontWeight: '700', fontSize: 14, color: '#0284c7' }}>Available Slots</Text>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                    {doctor.availableSlots.map(slot => (
                        <TouchableOpacity key={slot} onPress={() => setSelectedSlot(slot)} activeOpacity={0.7} style={{ paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, backgroundColor: selectedSlot === slot ? '#0ea5e9' : '#f1f5f9' }}>
                            <Text style={{ fontSize: 12, fontWeight: '600', color: selectedSlot === slot ? '#fff' : '#0284c7' }}>{slot}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#f1f5f9', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <View>
                    <Text style={{ fontSize: 12, color: '#64748b' }}>Consultation Fee</Text>
                    <Text style={{ fontSize: 22, fontWeight: '700', color: '#0284c7' }}>₹{doctor.consultationFee}</Text>
                </View>
                <View style={{ paddingHorizontal: 12, paddingVertical: 4, backgroundColor: '#dcfce7', borderRadius: 20 }}>
                    <Text style={{ fontSize: 10, fontWeight: '600', color: '#16a34a' }}>Payable after consultation</Text>
                </View>
            </View>

            <TouchableOpacity onPress={handleBook} disabled={!selectedSlot || booked} activeOpacity={0.7} style={{ width: '100%', paddingVertical: 14, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: booked ? '#16a34a' : selectedSlot ? '#0ea5e9' : '#e2e8f0' }}>
                {booked ? (
                    <><CheckCircle size={16} color="#fff" /><Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>Appointment Booked!</Text></>
                ) : (
                    <><Calendar size={16} color={selectedSlot ? '#fff' : '#64748b'} /><Text style={{ fontSize: 14, fontWeight: '600', color: selectedSlot ? '#fff' : '#64748b' }}>{selectedSlot ? `Book for ${selectedSlot}, ${selectedDate}` : 'Select a time slot'}</Text></>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
}
