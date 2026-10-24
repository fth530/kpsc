import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useGeographyStore } from '../store/useGeographyStore';
import {
  ArrowLeft,
  Award,
  Trash2,
  Play,
  CheckCircle2,
  AlertCircle,
  Zap,
} from 'lucide-react-native';

export default function WeakTopicsScreen() {
  const router = useRouter();
  const weakTopics = useGeographyStore((state: any) => state.weakTopics);
  const removeWeakTopic = useGeographyStore((state: any) => state.removeWeakTopic);
  const addXp = useGeographyStore((state: any) => state.addXp);

  const handleStartRecoveryQuiz = () => {
    router.push('/quiz');
  };

  const handleRemoveItem = (topic: string) => {
    removeWeakTopic(topic);
    addXp(10);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
          <ArrowLeft size={20} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Zayıf Bölgelerim & Kırmızı Liste</Text>
        <View style={styles.badgePill}>
          <Text style={styles.badgeText}>{weakTopics.length} Konu</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {weakTopics.length === 0 ? (
          /* EMPTY STATE */
          <View style={styles.emptyState}>
            <View style={styles.emptyIconCircle}>
              <Award size={48} color="#10B981" />
            </View>
            <Text style={styles.emptyTitle}>Harika İş!</Text>
            <Text style={styles.emptySubtitle}>
              Hiç zayıf bölgen yok, Türkiye coğrafyasına tam anlamıyla hakimsin! 🚀
            </Text>
            <TouchableOpacity
              style={styles.homeBtn}
              onPress={() => router.replace('/')}
            >
              <Text style={styles.homeBtnText}>Ana Sayfaya Dön</Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* ACTIVE WEAK TOPICS LIST */
          <View style={styles.activeState}>
            {/* Top Recovery Banner */}
            <View style={styles.heroBanner}>
              <AlertCircle size={24} color="#F59E0B" />
              <View style={styles.heroBannerContent}>
                <Text style={styles.heroBannerTitle}>Aralıklı Tekrar Zamanı!</Text>
                <Text style={styles.heroBannerSub}>
                  Karıştırdığın bu {weakTopics.length} konuyu telafi ederek harita fatihi unvanını kazan.
                </Text>
              </View>
            </View>

            {/* Recovery Action Button */}
            <TouchableOpacity
              style={styles.recoveryBtn}
              onPress={handleStartRecoveryQuiz}
            >
              <Play size={20} color="#FFFFFF" fill="#FFFFFF" />
              <Text style={styles.recoveryBtnText}>
                Zayıf Bölgeleri Fethet (Telafi Quiz'i)
              </Text>
            </TouchableOpacity>

            <Text style={styles.sectionHeading}>Odaklanılacak Konular Listesi</Text>

            {/* List */}
            <View style={styles.listContainer}>
              {weakTopics.map((topic: string, index: number) => (
                <View key={index} style={styles.topicCard}>
                  <View style={styles.topicCardLeft}>
                    <View style={styles.tagBadge}>
                      <Text style={styles.tagBadgeText}>#{index + 1}</Text>
                    </View>
                    <Text style={styles.topicTitle}>{topic}</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => handleRemoveItem(topic)}
                  >
                    <CheckCircle2 size={18} color="#10B981" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgePill: {
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#F59E0B',
  },
  content: {
    padding: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIconCircle: {
    width: 90,
    height: 90,
    backgroundColor: '#ECFDF5',
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    paddingHorizontal: 30,
    lineHeight: 22,
    marginBottom: 24,
  },
  homeBtn: {
    backgroundColor: '#10B981',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 16,
  },
  homeBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  activeState: {
    gap: 16,
  },
  heroBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFBEB',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  heroBannerContent: {
    flex: 1,
  },
  heroBannerTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  heroBannerSub: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 18,
  },
  recoveryBtn: {
    backgroundColor: '#10B981',
    height: 54,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  recoveryBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  listContainer: {
    gap: 10,
  },
  topicCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  topicCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  tagBadge: {
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#EF4444',
  },
  topicTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    flex: 1,
  },
  deleteBtn: {
    padding: 6,
  },
});
