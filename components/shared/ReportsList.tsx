import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { FileText, Calendar, Download, CheckCircle, Clock as ClockIcon } from 'lucide-react-native';
import { mockReports } from '@/lib/mock-data';
import { toast } from '@/hooks/use-toast';

export default function ReportsList() {
    const statusConfig: Record<string, { color: string; bg: string; icon: any }> = {
        Ready: { color: '#16a34a', bg: '#dcfce7', icon: CheckCircle },
        Processing: { color: '#ca8a04', bg: '#fef9c3', icon: ClockIcon },
        Pending: { color: '#64748b', bg: '#f1f5f9', icon: ClockIcon },
    };

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
            <Text style={{ fontSize: 20, fontWeight: '700', color: '#0284c7', marginBottom: 4 }}>Medical Reports</Text>
            <Text style={{ fontSize: 14, color: '#64748b', marginBottom: 16 }}>{mockReports.length} reports</Text>

            {mockReports.map((report) => {
                const cfg = statusConfig[report.status] || statusConfig.Pending;
                const StatusIcon = cfg.icon;
                return (
                    <View key={report.id} style={{ backgroundColor: '#fff', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#f1f5f9', flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                        <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: '#f0fdfa', alignItems: 'center', justifyContent: 'center' }}>
                            <FileText size={20} color="#0ea5e9" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontWeight: '600', fontSize: 14, color: '#0284c7' }}>{report.name}</Text>
                            <Text style={{ fontSize: 12, color: '#64748b' }}>{report.type}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 }}>
                                <Calendar size={12} color="#64748b" />
                                <Text style={{ fontSize: 11, color: '#64748b' }}>{report.date}</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: 'flex-end', gap: 6 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, backgroundColor: cfg.bg }}>
                                <StatusIcon size={10} color={cfg.color} />
                                <Text style={{ fontSize: 10, fontWeight: '600', color: cfg.color }}>{report.status}</Text>
                            </View>
                            {report.status === 'Ready' && (
                                <TouchableOpacity onPress={() => toast({ title: '📥 Report downloaded' })} activeOpacity={0.7}>
                                    <Download size={16} color="#0ea5e9" />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                );
            })}
        </ScrollView>
    );
}
