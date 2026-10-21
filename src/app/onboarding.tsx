import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useGeographyStore } from '../store/useGeographyStore';
import { MapPin, ArrowRight, Zap, Target, Award } from 'lucide-react-native';

export default function OnboardingScreen() {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const completeOnboarding = useGeographyStore((state: any) => state.completeOnboarding);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      completeOnboarding();
      router.replace('/');
    }
  };

  const handleSkip = () => {
    completeOnboarding();
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.brandBadge}>
          <MapPin size={20} color="#10B981" />
          <Text style={styles.brandTitle}>GeoKPSS</Text>
        </View>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Geç</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.stepContainer}>
        <View style={styles.stepBadge}>
          <Text style={styles.stepBadgeText}>ADIM {step} / 3</Text>
        </View>
        <View style={styles.indicatorRow}>
          <View style={[styles.indicatorBar, step >= 1 && styles.indicatorBarActive]} />
          <View style={[styles.indicatorBar, step >= 2 && styles.indicatorBarActive]} />
          <View style={[styles.indicatorBar, step >= 3 && styles.indicatorBarActive]} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {step === 1 && (
          <View style={styles.slideCard}>
            <View style={styles.graphicBox}>
              <View style={styles.mockMap}>
                <View style={[styles.mapPin, { top: 30, left: 60 }]}>
                  <Text style={styles.pinLabel}>Çukurova Deltası</Text>
                </View>
                <View style={[styles.mapPin, { top: 80, left: 180 }]}>
                  <Text style={styles.pinLabel}>Peri Bacaları</Text>
                </View>
                <View style={[styles.mapPin, { top: 140, left: 100 }]}>
                  <Text style={styles.pinLabel}>Karapınar Obruğu</Text>
                </View>
              </View>
              <Text style={styles.anchorBadge}>📍 Hafıza Çapası #12</Text>
            </View>

            <Text style={styles.title}>Ezberleme, Haritada Gör!</Text>
            <Text style={styles.subtitle}>
              Kuru maddeleri ezberlemek yerine gölleri, dağları ve madenleri interaktif harita üzerinde zihnine kalıcı olarak kodla.
            </Text>

            <View style={styles.badgeRow}>
              <View style={styles.pillBadge}>
                <Text style={styles.pillBadgeText}>🗺️ 100+ İnteraktif Katman</Text>
              </View>
              <View style={styles.pillBadge}>
                <Text style={styles.pillBadgeText}>🧠 Zihinsel Konumlandırma</Text>
              </View>
            </View>
          </View>
        )}

        {step === 2 && (
          <View style={styles.slideCard}>
            <View style={styles.graphicBox}>
              <View style={styles.logicFormulaBox}>
                <View style={styles.formulaItem}>
                  <Text style={styles.formulaTitle}>Kalker Kayaç</Text>
                  <Text style={styles.formulaSub}>#KimyasalTortul</Text>
                </View>
                <Text style={styles.operator}>+</Text>
                <View style={styles.formulaItem}>
                  <Text style={styles.formulaTitle}>Yeraltı Suyu</Text>
                  <Text style={styles.formulaSub}>#EritmeGücü</Text>
                </View>
              </View>
              <View style={styles.resultBox}>
                <Zap size={18} color="#10B981" />
                <Text style={styles.resultText}>Obruk Platosu (+25 XP)</Text>
              </View>
            </View>

            <Text style={styles.title}>Neden-Sonuç Zincirini Kur!</Text>
            <Text style={styles.subtitle}>
              Coğrafyayı formüllerle öğren: Hangi kayaç hangi yer şeklini doğurur, hangi iklim hangi bitki örtüsünü besler mantığını yakala.
            </Text>

            <View style={styles.badgeRow}>
              <View style={styles.pillBadge}>
                <Text style={styles.pillBadgeText}>⚡ Mantıksal Eşleştirme</Text>
              </View>
              <View style={styles.pillBadge}>
                <Text style={styles.pillBadgeText}>💡 Çıkmış Soru Örüntüleri</Text>
              </View>
            </View>
          </View>
        )}

        {step === 3 && (
          <View style={styles.slideCard}>
            <View style={styles.graphicBox}>
              <View style={styles.masteryGauge}>
                <Award size={36} color="#F59E0B" />
                <Text style={styles.gaugePercent}>%68</Text>
                <Text style={styles.gaugeLabel}>81 İl Hakimiyeti</Text>
              </View>

              <View style={styles.spacedRepCard}>
                <Target size={16} color="#10B981" />
                <Text style={styles.spacedRepText}>
                  Karstik Göller: 2 gün sonra tekrar vakti! ⏰
                </Text>
              </View>
            </View>

            <Text style={styles.title}>Zayıf Bölgelerini Fethet!</Text>
            <Text style={styles.subtitle}>
              Aralıklı tekrar algoritması ve 81 il analiz paneliyle KPSS sınavına kadar eksik hiçbir coğrafi detay bırakma.
            </Text>

            <View style={styles.badgeRow}>
              <View style={styles.pillBadge}>
                <Text style={styles.pillBadgeText}>🎯 Akıllı Tekrar</Text>
              </View>
              <View style={styles.pillBadge}>
                <Text style={styles.pillBadgeText}>🏆 81 İl Analizi</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.bottomArea}>
        <TouchableOpacity style={styles.ctaButton} onPress={handleNext}>
          <Text style={styles.ctaButtonText}>
            {step === 3 ? 'Keşfe Başla 🚀' : 'Devam Et'}
          </Text>
          {step < 3 && <ArrowRight size={20} color="#FFFFFF" />}
        </TouchableOpacity>
        {step === 3 && (
          <Text style={styles.subNote}>Ücretsiz başla • İstediğin zaman tekrar et</Text>
        )}
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
    paddingVertical: 12,
  },
  brandBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  skipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  stepContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  stepBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  stepBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#10B981',
  },
  indicatorRow: {
    flexDirection: 'row',
    gap: 8,
  },
  indicatorBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E2E8F0',
  },
  indicatorBarActive: {
    backgroundColor: '#10B981',
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  slideCard: {
    alignItems: 'center',
  },
  graphicBox: {
    width: '100%',
    height: 220,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 24,
  },
  mockMap: {
    width: '100%',
    height: 140,
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    position: 'relative',
  },
  mapPin: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  pinLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0F172A',
  },
  anchorBadge: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: '700',
    color: '#F59E0B',
  },
  logicFormulaBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  formulaItem: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  formulaTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  formulaSub: {
    fontSize: 10,
    color: '#64748B',
  },
  operator: {
    fontSize: 20,
    fontWeight: '800',
    color: '#10B981',
  },
  resultBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  resultText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#10B981',
  },
  masteryGauge: {
    alignItems: 'center',
    marginBottom: 12,
  },
  gaugePercent: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0F172A',
  },
  gaugeLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  spacedRepCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  spacedRepText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F59E0B',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 22,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 20,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 10,
  },
  pillBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  pillBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F172A',
  },
  bottomArea: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  ctaButton: {
    backgroundColor: '#10B981',
    height: 54,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  subNote: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 8,
  },
});
