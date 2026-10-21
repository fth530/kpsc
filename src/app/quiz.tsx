import React, { useState } from 'react';
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
import mockData from '../data/cografya_mock.json';
import { QuizQuestion, LogicChainItem } from '../types/geography';
import { X, Flame, Check, AlertCircle, Sparkles, MapPin } from 'lucide-react-native';

export default function QuizScreen() {
  const router = useRouter();
  const addXp = useGeographyStore((state: any) => state.addXp);
  const addWeakTopic = useGeographyStore((state: any) => state.addWeakTopic);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedChainItems, setSelectedChainItems] = useState<string[]>([]);
  const [selectedProvinceOption, setSelectedProvinceOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const questions = mockData.questions as unknown as QuizQuestion[];
  const currentQuestion = questions[currentQuestionIndex] || questions[0];

  const handleToggleChainItem = (itemId: string) => {
    if (isAnswered) return;
    if (selectedChainItems.includes(itemId)) {
      setSelectedChainItems(selectedChainItems.filter((id: string) => id !== itemId));
    } else {
      if (selectedChainItems.length < 2) {
        setSelectedChainItems([...selectedChainItems, itemId]);
      }
    }
  };

  const handleSelectProvince = (provinceName: string) => {
    if (isAnswered) return;
    setSelectedProvinceOption(provinceName);
  };

  const handleCheckAnswer = () => {
    if (isAnswered) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedChainItems([]);
        setSelectedProvinceOption(null);
        setIsAnswered(false);
      } else {
        router.replace('/');
      }
      return;
    }

    let correct = false;
    if (currentQuestion.type === 'typeA_logicChain') {
      const hasRock = selectedChainItems.includes(currentQuestion.correctChain.causeRock);
      const hasForce = selectedChainItems.includes(currentQuestion.correctChain.causeForce);
      const provCorrect = selectedProvinceOption === 'Konya';
      correct = hasRock && hasForce && provCorrect;
    } else {
      correct = selectedProvinceOption === 'Nevşehir';
    }

    setIsCorrect(correct);
    setIsAnswered(true);

    if (correct) {
      addXp(currentQuestion.xpReward || 20);
    } else {
      addWeakTopic(currentQuestion.questionText);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
          <X size={20} color="#0F172A" />
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Soru {currentQuestionIndex + 1}/{questions.length}
          </Text>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` },
              ]}
            />
          </View>
        </View>

        <View style={styles.streakPill}>
          <Flame size={14} color="#F59E0B" />
          <Text style={styles.streakText}>🔥 7 Gün</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.badgeRow}>
          <View style={styles.categoryBadge}>
            <Sparkles size={14} color="#10B981" />
            <Text style={styles.categoryBadgeText}>NEDEN - SONUÇ FORMÜLÜ</Text>
          </View>
        </View>

        <Text style={styles.questionText}>{currentQuestion.questionText}</Text>

        <View style={styles.radarCard}>
          <View style={styles.radarHeader}>
            <MapPin size={16} color="#F59E0B" />
            <Text style={styles.radarTitle}>📍 Karapınar / Konya Havzası</Text>
            <View style={styles.tagPill}>
              <Text style={styles.tagText}>ÖSYM Çıkmış ⭐</Text>
            </View>
          </View>
        </View>

        {currentQuestion.type === 'typeA_logicChain' && (
          <View style={styles.formulaSection}>
            <Text style={styles.sectionLabel}>Coğrafi Oluşum Parçalarını Eşleştir:</Text>
            <View style={styles.slotsRow}>
              <View
                style={[
                  styles.slotBox,
                  selectedChainItems.length > 0 && styles.slotBoxActive,
                ]}
              >
                <Text style={styles.slotText}>
                  {selectedChainItems[0]
                    ? currentQuestion.chainOptions.find((o: LogicChainItem) => o.id === selectedChainItems[0])
                        ?.title
                    : '[ 1. Etken ]'}
                </Text>
              </View>

              <Text style={styles.plusOp}>+</Text>

              <View
                style={[
                  styles.slotBox,
                  selectedChainItems.length > 1 && styles.slotBoxActive,
                ]}
              >
                <Text style={styles.slotText}>
                  {selectedChainItems[1]
                    ? currentQuestion.chainOptions.find((o: LogicChainItem) => o.id === selectedChainItems[1])
                        ?.title
                    : '[ 2. Etken ]'}
                </Text>
              </View>

              <Text style={styles.plusOp}>=</Text>

              <View style={styles.resultBox}>
                <Text style={styles.resultText}>Obruk Platosu</Text>
              </View>
            </View>

            <View style={styles.optionsGrid}>
              {currentQuestion.chainOptions.map((item: LogicChainItem) => {
                const isSelected = selectedChainItems.includes(item.id);
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[styles.optionCard, isSelected && styles.optionCardSelected]}
                    onPress={() => handleToggleChainItem(item.id)}
                  >
                    <Text
                      style={[
                        styles.optionCardTitle,
                        isSelected && styles.optionCardTitleSelected,
                      ]}
                    >
                      {item.title}
                    </Text>
                    <Text style={styles.optionCardTag}>{item.tag}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        <View style={styles.locationSection}>
          <Text style={styles.sectionLabel}>📍 Haritada İşaretli İli Bul:</Text>
          <View style={styles.provinceRow}>
            {(currentQuestion.provinceOptions || ['Konya', 'Antalya', 'Nevşehir', 'Sivas']).map(
              (provName: string) => {
                const isSelected = selectedProvinceOption === provName;
                return (
                  <TouchableOpacity
                    key={provName}
                    style={[
                      styles.provinceChip,
                      isSelected && styles.provinceChipSelected,
                    ]}
                    onPress={() => handleSelectProvince(provName)}
                  >
                    {isSelected && <Check size={14} color="#FFFFFF" />}
                    <Text
                      style={[
                        styles.provinceChipText,
                        isSelected && styles.provinceChipTextSelected,
                      ]}
                    >
                      {provName}
                    </Text>
                  </TouchableOpacity>
                );
              }
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footerArea}>
        {isAnswered && (
          <View
            style={[
              styles.feedbackBanner,
              isCorrect ? styles.feedbackSuccess : styles.feedbackError,
            ]}
          >
            {isCorrect ? (
              <Check size={20} color="#10B981" />
            ) : (
              <AlertCircle size={20} color="#EF4444" />
            )}
            <View style={styles.feedbackContent}>
              <Text
                style={[
                  styles.feedbackTitle,
                  { color: isCorrect ? '#10B981' : '#EF4444' },
                ]}
              >
                {isCorrect ? 'Harika Eşleştirme! (+20 XP)' : 'Yanlış Bağlantı!'}
              </Text>
              <Text style={styles.feedbackDesc}>{currentQuestion.explanation}</Text>
            </View>
          </View>
        )}

        <TouchableOpacity
          style={[styles.checkBtn, isAnswered && styles.checkBtnNext]}
          onPress={handleCheckAnswer}
        >
          <Text style={styles.checkBtnText}>
            {isAnswered ? 'Devam Et →' : 'Yanıtı Kontrol Et'}
          </Text>
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
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    gap: 12,
  },
  closeBtn: {
    padding: 6,
  },
  progressContainer: {
    flex: 1,
  },
  progressText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 4,
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
  },
  streakPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  streakText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#F59E0B',
  },
  content: {
    padding: 16,
  },
  badgeRow: {
    marginBottom: 10,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#10B981',
  },
  questionText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 24,
    marginBottom: 16,
  },
  radarCard: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  radarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  radarTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    flex: 1,
  },
  tagPill: {
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#F59E0B',
  },
  formulaSection: {
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 10,
  },
  slotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 14,
  },
  slotBox: {
    flex: 1,
    height: 44,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  slotBoxActive: {
    borderColor: '#10B981',
    borderStyle: 'solid',
    backgroundColor: '#ECFDF5',
  },
  slotText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
  },
  plusOp: {
    fontSize: 16,
    fontWeight: '800',
    color: '#10B981',
  },
  resultBox: {
    flex: 1,
    height: 44,
    backgroundColor: '#10B981',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  resultText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  optionCardSelected: {
    borderColor: '#10B981',
    backgroundColor: '#ECFDF5',
  },
  optionCardTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  optionCardTitleSelected: {
    color: '#10B981',
  },
  optionCardTag: {
    fontSize: 10,
    color: '#64748B',
  },
  locationSection: {
    marginBottom: 16,
  },
  provinceRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  provinceChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  provinceChipSelected: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  provinceChipText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  provinceChipTextSelected: {
    color: '#FFFFFF',
  },
  footerArea: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  feedbackBanner: {
    flexDirection: 'row',
    gap: 10,
    padding: 12,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
  },
  feedbackSuccess: {
    backgroundColor: '#ECFDF5',
    borderColor: '#10B981',
  },
  feedbackError: {
    backgroundColor: '#FEF2F2',
    borderColor: '#EF4444',
  },
  feedbackContent: {
    flex: 1,
  },
  feedbackTitle: {
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 2,
  },
  feedbackDesc: {
    fontSize: 11,
    color: '#0F172A',
    lineHeight: 16,
  },
  checkBtn: {
    backgroundColor: '#0F172A',
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBtnNext: {
    backgroundColor: '#10B981',
  },
  checkBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
