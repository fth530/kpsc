import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Path, Rect, Text as SvgText, Line, Circle } from 'react-native-svg';
import { useGeographyStore } from '../store/useGeographyStore';
import mockData from '../data/cografya_mock.json';
import { Flashcard } from '../types/geography';
import { ArrowLeft, RotateCw, CheckCircle, AlertTriangle, Sparkles, BookOpen } from 'lucide-react-native';

export default function FlashcardsScreen() {
  const router = useRouter();
  const addXp = useGeographyStore((state: any) => state.addXp);
  const addWeakTopic = useGeographyStore((state: any) => state.addWeakTopic);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const flashcards = mockData.flashcards as unknown as Flashcard[];
  const currentCard = flashcards[currentIndex] || flashcards[0];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleLearned = () => {
    addXp(15);
    nextCard();
  };

  const handleNeedsReview = () => {
    addWeakTopic(`${currentCard.title} (${currentCard.subtitle})`);
    nextCard();
  };

  const nextCard = () => {
    setIsFlipped(false);
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back
    }
  };

  // Render SVG diagram based on diagramType
  const renderDiagram = (type: string) => {
    switch (type) {
      case 'boyunaKiyi':
        return (
          <Svg viewBox="0 0 300 120" style={styles.svgDiagram}>
            <Rect width="300" height="120" fill="#F1F5F9" rx="12" />
            <Rect x="0" y="60" width="120" height="60" fill="#38BDF8" opacity={0.6} />
            <SvgText x="60" y="95" fill="#0284C7" fontSize="11" fontWeight="bold" textAnchor="middle">
              DENİZ
            </SvgText>
            <Path d="M 120 120 L 140 30 L 170 120 Z" fill="#64748B" />
            <Path d="M 180 120 L 200 20 L 230 120 Z" fill="#475569" />
            <Path d="M 240 120 L 260 40 L 290 120 Z" fill="#334155" />
            <Line x1="120" y1="10" x2="290" y2="10" stroke="#10B981" strokeWidth="3" strokeDasharray="5,5" />
            <SvgText x="205" y="25" fill="#10B981" fontSize="10" fontWeight="bold" textAnchor="middle">
              Dağlar Denize PARALEL
            </SvgText>
          </Svg>
        );

      case 'enineKiyi':
        return (
          <Svg viewBox="0 0 300 120" style={styles.svgDiagram}>
            <Rect width="300" height="120" fill="#F1F5F9" rx="12" />
            <Rect x="0" y="0" width="100" height="120" fill="#38BDF8" opacity={0.6} />
            <SvgText x="50" y="65" fill="#0284C7" fontSize="11" fontWeight="bold" textAnchor="middle">
              EGE DENİZİ
            </SvgText>
            <Path d="M 100 20 L 280 20 L 280 40 L 100 40 Z" fill="#64748B" />
            <Path d="M 100 60 L 280 60 L 280 80 L 100 80 Z" fill="#475569" />
            <Path d="M 100 100 L 280 100 L 280 120 L 100 120 Z" fill="#334155" />
            <SvgText x="190" y="34" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">
              Dağ (Horst)
            </SvgText>
            <SvgText x="190" y="54" fill="#10B981" fontSize="10" fontWeight="bold" textAnchor="middle">
              Graben Ovası ➔ DİK
            </SvgText>
          </Svg>
        );

      case 'horstGraben':
        return (
          <Svg viewBox="0 0 300 120" style={styles.svgDiagram}>
            <Rect width="300" height="120" fill="#F1F5F9" rx="12" />
            <Path d="M 20 100 L 20 30 L 90 30 L 90 100 Z" fill="#10B981" />
            <SvgText x="55" y="65" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">
              HORST
            </SvgText>
            <Line x1="95" y1="20" x2="95" y2="110" stroke="#EF4444" strokeWidth="2" strokeDasharray="3,3" />
            <Path d="M 100 100 L 100 70 L 190 70 L 190 100 Z" fill="#F59E0B" />
            <SvgText x="145" y="90" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">
              GRABEN
            </SvgText>
            <Path d="M 200 100 L 200 30 L 280 30 L 280 100 Z" fill="#10B981" />
            <SvgText x="240" y="65" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">
              HORST
            </SvgText>
          </Svg>
        );

      case 'riaKiyi':
        return (
          <Svg viewBox="0 0 300 120" style={styles.svgDiagram}>
            <Rect width="300" height="120" fill="#F1F5F9" rx="12" />
            <Path d="M 10 10 L 120 10 L 100 110 L 10 110 Z" fill="#64748B" />
            <Path d="M 180 10 L 290 10 L 290 110 L 200 110 Z" fill="#64748B" />
            <Path d="M 120 10 L 180 10 L 200 110 L 100 110 Z" fill="#38BDF8" opacity={0.8} />
            <SvgText x="150" y="60" fill="#0284C7" fontSize="11" fontWeight="bold" textAnchor="middle">
              BOĞAZ / SULAR ALTI VADİ
            </SvgText>
          </Svg>
        );

      case 'dalmacyaKiyi':
        return (
          <Svg viewBox="0 0 300 120" style={styles.svgDiagram}>
            <Rect width="300" height="120" fill="#38BDF8" opacity={0.6} rx="12" />
            <Rect x="200" y="0" width="100" height="120" fill="#64748B" />
            <SvgText x="250" y="65" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">
              KARA
            </SvgText>
            <Circle cx="50" cy="30" r="14" fill="#10B981" />
            <Circle cx="50" cy="80" r="18" fill="#10B981" />
            <Circle cx="120" cy="40" r="20" fill="#10B981" />
            <Circle cx="130" cy="90" r="12" fill="#10B981" />
            <SvgText x="90" y="20" fill="#0284C7" fontSize="10" fontWeight="bold" textAnchor="middle">
              Paralel Adacıklar (Finike - Kaş)
            </SvgText>
          </Svg>
        );

      default: // kivrimDag
        return (
          <Svg viewBox="0 0 300 120" style={styles.svgDiagram}>
            <Rect width="300" height="120" fill="#F1F5F9" rx="12" />
            <Path
              d="M 10 90 Q 60 10 110 90 T 210 90 T 290 90"
              fill="none"
              stroke="#0F172A"
              strokeWidth="4"
            />
            <SvgText x="60" y="35" fill="#10B981" fontSize="11" fontWeight="bold" textAnchor="middle">
              ANTİKLİNAL (Tepe)
            </SvgText>
            <SvgText x="160" y="105" fill="#F59E0B" fontSize="11" fontWeight="bold" textAnchor="middle">
              SENKLİNAL (Çukur)
            </SvgText>
          </Svg>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
          <ArrowLeft size={20} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Görsel Şemalı Hafıza Kartları</Text>
        <View style={styles.cardCounter}>
          <Text style={styles.cardCounterText}>
            {currentIndex + 1} / {flashcards.length}
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.cardContainer}
          onPress={handleFlip}
        >
          <View style={styles.cardHeader}>
            <View style={styles.categoryBadge}>
              <Sparkles size={14} color="#10B981" />
              <Text style={styles.categoryText}>{currentCard.subtitle}</Text>
            </View>
            <View style={styles.flipHint}>
              <RotateCw size={14} color="#64748B" />
              <Text style={styles.flipHintText}>
                {isFlipped ? 'Ön Yüzüne Dön' : 'Çevir & Detay Gör'}
              </Text>
            </View>
          </View>

          {!isFlipped ? (
            <View style={styles.frontFace}>
              <Text style={styles.cardTitle}>{currentCard.title}</Text>

              <View style={styles.diagramWrapper}>
                {renderDiagram(currentCard.diagramType)}
              </View>

              <View style={styles.frontHintBox}>
                <BookOpen size={18} color="#10B981" />
                <Text style={styles.frontHintText}>{currentCard.frontHint}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.backFace}>
              <Text style={styles.backTitle}>{currentCard.title} - Neden/Sonuç</Text>

              <View style={styles.logicBlock}>
                <Text style={styles.logicLabel}>Oluşum Nedeni & Süreç:</Text>
                <Text style={styles.logicValue}>{currentCard.backLogic.cause}</Text>
              </View>

              <View style={styles.logicBlock}>
                <Text style={styles.logicLabel}>Coğrafi Sonuçlar & Arazi Yapısı:</Text>
                <Text style={styles.logicValue}>{currentCard.backLogic.effect}</Text>
              </View>

              <View style={styles.mnemonicBox}>
                <Text style={styles.mnemonicLabel}>💡 ŞİFRELİ HAFIZA:</Text>
                <Text style={styles.mnemonicText}>{currentCard.backLogic.mnemonic}</Text>
              </View>

              <View style={styles.examTipBox}>
                <Text style={styles.examTipLabel}>⭐ ÖSYM KPSS TAKTİĞİ:</Text>
                <Text style={styles.examTipText}>{currentCard.backLogic.examTip}</Text>
              </View>
            </View>
          )}
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={[styles.actionBtn, styles.btnNeedsReview]}
          onPress={handleNeedsReview}
        >
          <AlertTriangle size={18} color="#FFFFFF" />
          <Text style={styles.actionBtnText}>Karıştırıyorum / Tekrar Et</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, styles.btnLearned]}
          onPress={handleLearned}
        >
          <CheckCircle size={18} color="#FFFFFF" />
          <Text style={styles.actionBtnText}>Öğrendim (+15 XP)</Text>
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
  cardCounter: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  cardCounterText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#10B981',
  },
  content: {
    padding: 16,
    alignItems: 'center',
  },
  cardContainer: {
    width: '100%',
    minHeight: 420,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#10B981',
  },
  flipHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  flipHintText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  frontFace: {
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 16,
    textAlign: 'center',
  },
  diagramWrapper: {
    width: '100%',
    marginBottom: 16,
  },
  svgDiagram: {
    width: '100%',
    height: 140,
  },
  frontHintBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  frontHintText: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
    lineHeight: 18,
  },
  backFace: {
    gap: 12,
  },
  backTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  logicBlock: {
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  logicLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 2,
  },
  logicValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
    lineHeight: 18,
  },
  mnemonicBox: {
    backgroundColor: '#ECFDF5',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  mnemonicLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#10B981',
    marginBottom: 2,
  },
  mnemonicText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  examTipBox: {
    backgroundColor: '#FFFBEB',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  examTipLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#F59E0B',
    marginBottom: 2,
  },
  examTipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F172A',
    lineHeight: 16,
  },
  actionRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 10,
  },
  actionBtn: {
    flex: 1,
    height: 50,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  btnNeedsReview: {
    backgroundColor: '#F59E0B',
  },
  btnLearned: {
    backgroundColor: '#10B981',
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
