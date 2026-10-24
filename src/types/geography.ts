// TODO: Antigravity - Projeyi devraldığınızda bu tür tanımlarını yeni veri şemalarınıza göre genişletebilirsiniz.

export type LayerType = 'all' | 'mountains' | 'karst' | 'mines' | 'soils' | 'faults' | 'coasts';

export interface Province {
  id: string; // e.g. "42" for Konya
  name: string; // e.g. "Konya"
  region: string; // e.g. "İç Anadolu"
  svgPath?: string; // TODO: 81 il SVG path string (d="...") buraya inject edilecek
  centerCoords: { x: number; y: number }; // SVG viewBox koordinatları
  masteryPercentage: number;
  description: string;
}

export interface GeographicalFeature {
  id: string;
  title: string;
  category: LayerType;
  provinceId: string; // Hangi il sınırlarında yer alıyor
  coords: { x: number; y: number }; // SVG üzerindeki pin konumu
  badgeText: string; // Örn: "Karstik Aşınım"
  examFrequency: string; // Örn: "%95 ÖSYM Favorisi"
  formationLogic: {
    cause: string; // "Kalker + Yeraltı Suyu"
    effect: string; // "Tavan Çökmesi & Obruk"
    summary: string;
  };
  visualHint: string; // "Kireçtaşının su ile erimesi sonucu oluşan dairesel çukurlar"
  examTip: string; // KPSS Sınav Taktiği / Şifreli Not
  pastExamYears: number[];
}

export interface Flashcard {
  id: string;
  category: LayerType;
  title: string;
  subtitle: string;
  diagramType: 'boyunaKiyi' | 'enineKiyi' | 'horstGraben' | 'kivrimDag';
  frontHint: string;
  backLogic: {
    cause: string;
    effect: string;
    mnemonic: string;
    examTip: string;
  };
}

export interface LogicChainItem {
  id: string;
  title: string;
  category: 'rock' | 'force' | 'formation';
  tag: string;
}

export interface QuizQuestion {
  id: string;
  type: 'typeA_logicChain' | 'typeB_blankMap';
  targetFeatureId: string;
  targetProvinceId: string;
  questionText: string;
  topicTag: string;
  correctChain: {
    causeRock: string;
    causeForce: string;
    resultFormation: string;
  };
  chainOptions: LogicChainItem[];
  provinceOptions?: string[];
  correctProvinceId?: string;
  explanation: string;
  xpReward: number;
}

export interface UserStats {
  streak: number;
  xp: number;
  overallMasteryPercentage: number;
  completedProvincesCount: number;
}
