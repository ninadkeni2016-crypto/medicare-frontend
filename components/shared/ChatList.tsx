import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import { Search, Bot, ChevronRight } from 'lucide-react-native';
import { patientConversations, doctorConversations, Conversation } from '@/lib/chat-data';
import { useAuth } from '@/contexts/AuthContext';

interface Props { onSelectConversation: (c: Conversation) => void; onOpenAI?: () => void; }

export default function ChatList({ onSelectConversation, onOpenAI }: Props) {
    const { role } = useAuth();
    const conversations = role === 'doctor' ? doctorConversations : patientConversations;
    const [search, setSearch] = useState('');
    const filtered = search ? conversations.filter(c => c.participantName.toLowerCase().includes(search.toLowerCase())) : conversations;

    return (
        <View style={{ flex: 1 }}>
            <View style={{ padding: 16, paddingBottom: 0 }}>
                <Text style={{ fontSize: 20, fontWeight: '700', color: '#0284c7', marginBottom: 4 }}>Messages</Text>
                <Text style={{ fontSize: 14, color: '#64748b', marginBottom: 12 }}>{conversations.length} conversations</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#f1f5f9', borderRadius: 12, paddingHorizontal: 12, marginBottom: 12 }}>
                    <Search size={16} color="#64748b" />
                    <TextInput value={search} onChangeText={setSearch} placeholder="Search conversations..." placeholderTextColor="#94a3b8" style={{ flex: 1, paddingVertical: 10, fontSize: 14, color: '#0284c7' }} />
                </View>

                {onOpenAI && (
                    <TouchableOpacity onPress={onOpenAI} activeOpacity={0.7} style={{ backgroundColor: '#f0fdfa', borderRadius: 16, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                        <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: '#0ea5e9', alignItems: 'center', justifyContent: 'center' }}>
                            <Bot size={22} color="#fff" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontWeight: '600', fontSize: 14, color: '#0ea5e9' }}>AI Health Assistant</Text>
                            <Text style={{ fontSize: 12, color: '#64748b' }}>Check symptoms, get advice</Text>
                        </View>
                        <ChevronRight size={16} color="#0ea5e9" />
                    </TouchableOpacity>
                )}
            </View>

            <FlatList
                data={filtered}
                keyExtractor={item => item.id}
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => onSelectConversation(item)} activeOpacity={0.7} style={{ backgroundColor: '#fff', borderRadius: 16, padding: 14, borderWidth: 1, borderColor: '#f1f5f9', flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                        <View style={{ position: 'relative' }}>
                            <Image source={{ uri: item.participantAvatar }} style={{ width: 48, height: 48, borderRadius: 12 }} />
                            {item.online && <View style={{ position: 'absolute', bottom: -1, right: -1, width: 14, height: 14, borderRadius: 7, backgroundColor: '#16a34a', borderWidth: 2, borderColor: '#fff' }} />}
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontWeight: '600', fontSize: 14, color: '#0284c7' }}>{item.participantName}</Text>
                            {item.specialization && <Text style={{ fontSize: 10, color: '#0ea5e9', fontWeight: '500' }}>{item.specialization}</Text>}
                            <Text style={{ fontSize: 12, color: '#64748b', marginTop: 2 }} numberOfLines={1}>{item.lastMessage}</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end', gap: 4 }}>
                            <Text style={{ fontSize: 10, color: '#64748b' }}>{item.lastMessageTime}</Text>
                            {item.unreadCount > 0 && (
                                <View style={{ backgroundColor: '#0ea5e9', borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2 }}>
                                    <Text style={{ fontSize: 10, fontWeight: '600', color: '#fff' }}>{item.unreadCount}</Text>
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
