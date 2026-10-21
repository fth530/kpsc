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
  Flame,
  Zap,
  MapPin,
  Play,
  Compass,
  Mountain,
  Droplets,
  Pickaxe,
  Waves,
  BrainCircuit,
  Map as MapIcon,
  HelpCircle,
  Trophy,
  User,
} from 'lucide-react-native';

export default function DashboardScreen() {
  const router = useRouter();
  const userStats = useGeographyStore((state: any) => state.userStats);

  const bentoModules = [
    {
      id: 'blankMap',
      title: '81 İl Kör Harita',
      badge: 'Popüler',
      progress: '%78 Usta',
      icon: MapPin,
      route: '/map',
    },
    {
      id: 'mountains',
      title: 'Dağlar & Platolar',
      badge: 'Jeomorfoloji',
      progress: '%55 Orta',
      icon: Mountain,
      route: '/map',
    },
    {
      id: 'karst',
      title: 'Karstik & Obruklar',
      badge: 'Kritik Konu',
      progress: '%40 Tekrar Gerek',
      icon: Droplets,
      route: '/map',
    },
    {
      id: 'mines',
      title: 'Madenler & Enerji',
      badge: 'Ezber Bozan',
      progress: '%60 İleri',
      icon: Pickaxe,
      route: '/map',
    },
    {
      id: 'soils',
      title: 'Toprak & Kıyılar',
      badge: 'Görsel Hafıza',
      progress: '%30 Başlangıç',
      icon: Waves,
      route: '/map',
    },
    {
      id: 'quiz',
      title: 'Neden-Sonuç Quiz',
      badge: 'ÖSYM Tipi',
      progress: '%85 Usta',
      icon: BrainCircuit,
      route: '/quiz',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.brandGroup}>
          <Compass size={24} color="#10B981" />
          <Text style={styles.brandName}>GeoKPSS</Text>
        </View>

        <View style={styles.statsGroup}>
          <View style={styles.streakBadge}>
            <Flame size={16} color="#F59E0B" />
            <Text style={styles.streakText}>{userStats.streak} Gün</Text>
          </View>
          <View style={styles.xpBadge}>
            <Zap size={16} color="#10B981" />
            <Text style={styles.xpText}>{userStats.xp} XP</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.masteryCard}>
          <View style={styles.masteryHeader}>
            <Text style={styles.masteryTitle}>Türkiye Hakimiyet Oranı</Text>
            <View style={styles.masteryPill}>
              <Text style={styles.masteryPillText}>
                %{userStats.overallMasteryPercentage} Hakimiyet
              </Text>
            </View>
          </View>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${userStats.overallMasteryPercentage}%` },
              ]}
            />
          </View>

          <Text style={styles.masterySubtext}>
            {userStats.completedProvincesCount} / 81 İl Tamamlandı • KPSS 18/18 Hedefi
          </Text>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroHeader}>
            <Text style={styles.heroBadge}>GÜNÜN COĞRAFİ KEŞFİ</Text>
            <Text style={styles.heroTitle}>Karstik Aşınım Şekilleri & Göller Yöresi</Text>
          </View>
          <Text style={styles.heroSub}>
            Bugün 12 Kritik Soru & 3 Kör Harita Noktası seni bekliyor.
          </Text>

          <TouchableOpacity
            style={styles.heroButton}
            onPress={() => router.push('/quiz')}
          >
            <Play size={18} color="#FFFFFF" fill="#FFFFFF" />
            <Text style={styles.heroButtonText}>Hızlı Başla 🚀</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionHeading}>Öğrenme Modülleri</Text>

        <View style={styles.bentoGrid}>
          {bentoModules.map((item) => {
            const IconComp = item.icon;
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.bentoCard}
                onPress={() => router.push(item.route as any)}
              >
                <View style={styles.bentoCardTop}>
                  <View style={styles.iconCircle}>
                    <IconComp size={20} color="#10B981" />
                  </View>
                  <View style={styles.moduleBadge}>
                    <Text style={styles.moduleBadgeText}>{item.badge}</Text>
                  </View>
                </View>

                <Text style={styles.bentoTitle}>{item.title}</Text>
                <Text style={styles.bentoProgress}>{item.progress}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Compass size={22} color="#10B981" />
          <Text style={[styles.navText, styles.navTextActive]}>Ana Sayfa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/map')}>
          <MapIcon size={22} color="#64748B" />
          <Text style={styles.navText}>Haritalar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/quiz')}>
          <HelpCircle size={22} color="#64748B" />
          <Text style={styles.navText}>Testler</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Trophy size={22} color="#64748B" />
          <Text style={styles.navText}>Sıralama</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <User size={22} color="#64748B" />
          <Text style={styles.navText}>Profil</Text>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  brandGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  statsGroup: {
    flexDirection: 'row',
    gap: 10,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  streakText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#F59E0B',
  },
  xpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  xpText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#10B981',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 90,
  },
  masteryCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  masteryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  masteryTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  masteryPill: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  masteryPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#10B981',
  },
  progressTrack: {
    height: 10,
    backgroundColor: '#E2E8F0',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
  },
  masterySubtext: {
    fontSize: 12,
    color: '#64748B',
  },
  heroCard: {
    backgroundColor: '#0F172A',
    padding: 20,
    borderRadius: 24,
    marginBottom: 20,
  },
  heroHeader: {
    marginBottom: 8,
  },
  heroBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: '#F59E0B',
    marginBottom: 4,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  heroSub: {
    fontSize: 13,
    color: '#94A3B8',
    marginBottom: 16,
  },
  heroButton: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 16,
  },
  heroButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
  },
  bentoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  bentoCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'space-between',
  },
  bentoCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconCircle: {
    width: 36,
    height: 36,
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moduleBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  moduleBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#64748B',
  },
  bentoTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  bentoProgress: {
    fontSize: 11,
    fontWeight: '600',
    color: '#10B981',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 65,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 2,
  },
  navTextActive: {
    color: '#10B981',
    fontWeight: '700',
  },
});
