import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useGeographyStore } from '../store/useGeographyStore';
import { InteractiveMapPlaceholder } from '../components/InteractiveMapPlaceholder';
import mockData from '../data/cografya_mock.json';
import { LayerType, Province, GeographicalFeature } from '../types/geography';
import {
  ArrowLeft,
  Search,
  Check,
  Zap,
  Info,
  Award,
  BookmarkPlus,
} from 'lucide-react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function MapScreen() {
  const router = useRouter();
  const activeLayers = useGeographyStore((state: any) => state.activeMapLayers);
  const toggleLayer = useGeographyStore((state: any) => state.toggleMapLayer);
  const addXp = useGeographyStore((state: any) => state.addXp);

  const [selectedProvince, setSelectedProvince] = useState<Province | null>(
    (mockData.provinces[0] as unknown) as Province
  );
  const [selectedFeature, setSelectedFeature] = useState<GeographicalFeature | null>(
    (mockData.features[0] as unknown) as GeographicalFeature
  );
  const [activeTab, setActiveTab] = useState<'why' | 'visual' | 'exam'>('why');

  const layers: { id: LayerType; label: string }[] = [
    { id: 'all', label: 'Tümü' },
    { id: 'karst', label: 'Karstik & Obruklar' },
    { id: 'mountains', label: 'Volkanik Dağlar' },
    { id: 'mines', label: 'Madenler & Enerji' },
    { id: 'soils', label: 'Toprak Tipleri' },
  ];

  const handleTestRegion = () => {
    addXp(20);
    router.push('/quiz');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
          <ArrowLeft size={20} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>GeoKPSS Harita & Keşif</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Search size={20} color="#0F172A" />
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {layers.map((layer) => {
            const isActive = activeLayers.includes(layer.id);
            return (
              <TouchableOpacity
                key={layer.id}
                style={[styles.filterChip, isActive && styles.filterChipActive]}
                onPress={() => toggleLayer(layer.id)}
              >
                {isActive && <Check size={14} color="#FFFFFF" />}
                <Text
                  style={[
                    styles.filterChipText,
                    isActive && styles.filterChipTextActive,
                  ]}
                >
                  {layer.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.mapArea}>
        <InteractiveMapPlaceholder
          provinces={mockData.provinces as unknown as Province[]}
          features={mockData.features as unknown as GeographicalFeature[]}
          activeLayers={activeLayers}
          selectedProvinceId={selectedProvince?.id}
          selectedFeatureId={selectedFeature?.id}
          onSelectProvince={(prov: Province) => {
            setSelectedProvince(prov);
            const feat = mockData.features.find((f) => f.provinceId === prov.id);
            if (feat) setSelectedFeature((feat as unknown) as GeographicalFeature);
          }}
          onSelectFeature={(feat: GeographicalFeature) => {
            setSelectedFeature(feat);
            const prov = mockData.provinces.find((p) => p.id === feat.provinceId);
            if (prov) setSelectedProvince((prov as unknown) as Province);
          }}
        />
      </View>

      {selectedFeature && (
        <View style={styles.bottomSheet}>
          <View style={styles.handleBar} />

          <View style={styles.sheetHeader}>
            <View>
              <Text style={styles.sheetTitle}>{selectedFeature.title}</Text>
              <View style={styles.badgeRow}>
                <View style={styles.emeraldBadge}>
                  <Text style={styles.emeraldBadgeText}>{selectedFeature.badgeText}</Text>
                </View>
                <View style={styles.amberBadge}>
                  <Text style={styles.amberBadgeText}>{selectedFeature.examFrequency}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.bookmarkBtn}>
              <BookmarkPlus size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tabBtn, activeTab === 'why' && styles.tabBtnActive]}
              onPress={() => setActiveTab('why')}
            >
              <Text style={[styles.tabText, activeTab === 'why' && styles.tabTextActive]}>
                Neden Oluştu?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabBtn, activeTab === 'visual' && styles.tabBtnActive]}
              onPress={() => setActiveTab('visual')}
            >
              <Text style={[styles.tabText, activeTab === 'visual' && styles.tabTextActive]}>
                Görsel İpucu
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabBtn, activeTab === 'exam' && styles.tabBtnActive]}
              onPress={() => setActiveTab('exam')}
            >
              <Text style={[styles.tabText, activeTab === 'exam' && styles.tabTextActive]}>
                Sınavda Nasıl Çıkar?
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.sheetContent}>
            {activeTab === 'why' && (
              <View style={styles.tabPane}>
                <View style={styles.formulaCard}>
                  <Text style={styles.formulaLabel}>NEDEN - SONUÇ FORMÜLÜ</Text>
                  <Text style={styles.formulaBody}>{selectedFeature.formationLogic.cause}</Text>
                  <Text style={styles.formulaArrow}>➔</Text>
                  <Text style={styles.formulaResult}>{selectedFeature.formationLogic.effect}</Text>
                </View>
                <Text style={styles.summaryText}>
                  {selectedFeature.formationLogic.summary}
                </Text>
              </View>
            )}

            {activeTab === 'visual' && (
              <View style={styles.tabPane}>
                <View style={styles.visualDiagram}>
                  <Info size={24} color="#10B981" />
                  <Text style={styles.diagramText}>{selectedFeature.visualHint}</Text>
                </View>
              </View>
            )}

            {activeTab === 'exam' && (
              <View style={styles.tabPane}>
                <View style={styles.examCard}>
                  <Award size={20} color="#F59E0B" />
                  <Text style={styles.examTipText}>{selectedFeature.examTip}</Text>
                </View>
                <Text style={styles.pastYearsText}>
                  Çıkmış Soru Yılları: {selectedFeature.pastExamYears.join(', ')} KPSS
                </Text>
              </View>
            )}
          </ScrollView>

          <TouchableOpacity style={styles.actionBtn} onPress={handleTestRegion}>
            <Zap size={18} color="#FFFFFF" />
            <Text style={styles.actionBtnText}>Bu Bölgeyi Test Et (+20 XP)</Text>
          </TouchableOpacity>
        </View>
      )}
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
  filterContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  filterScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
  },
  filterChipActive: {
    backgroundColor: '#10B981',
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  mapArea: {
    flex: 1,
    padding: 16,
  },
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    maxHeight: SCREEN_HEIGHT * 0.45,
  },
  handleBar: {
    width: 36,
    height: 4,
    backgroundColor: '#CBD5E1',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 6,
  },
  emeraldBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  emeraldBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#10B981',
  },
  amberBadge: {
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  amberBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#F59E0B',
  },
  bookmarkBtn: {
    padding: 6,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 4,
    marginBottom: 12,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabBtnActive: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  tabTextActive: {
    color: '#0F172A',
    fontWeight: '700',
  },
  sheetContent: {
    maxHeight: 120,
    marginBottom: 12,
  },
  tabPane: {
    gap: 8,
  },
  formulaCard: {
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  formulaLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#10B981',
    marginBottom: 2,
  },
  formulaBody: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  formulaArrow: {
    fontSize: 12,
    fontWeight: '800',
    color: '#10B981',
  },
  formulaResult: {
    fontSize: 12,
    fontWeight: '700',
    color: '#10B981',
  },
  summaryText: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 18,
  },
  visualDiagram: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#ECFDF5',
    padding: 12,
    borderRadius: 12,
  },
  diagramText: {
    fontSize: 12,
    color: '#0F172A',
    flex: 1,
  },
  examCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFBEB',
    padding: 10,
    borderRadius: 12,
  },
  examTipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F59E0B',
    flex: 1,
  },
  pastYearsText: {
    fontSize: 11,
    color: '#64748B',
  },
  actionBtn: {
    backgroundColor: '#10B981',
    height: 48,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  actionBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
