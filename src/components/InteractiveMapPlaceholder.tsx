import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { G, Path, Circle, Text as SvgText, Rect } from 'react-native-svg';
import { Province, GeographicalFeature, LayerType } from '../types/geography';

export interface InteractiveMapPlaceholderProps {
  provinces: Province[];
  features: GeographicalFeature[];
  activeLayers: LayerType[];
  selectedProvinceId?: string | null;
  selectedFeatureId?: string | null;
  onSelectProvince: (province: Province) => void;
  onSelectFeature: (feature: GeographicalFeature) => void;
}

export const InteractiveMapPlaceholder: React.FC<InteractiveMapPlaceholderProps> = (
  props: InteractiveMapPlaceholderProps
) => {
  const {
    provinces,
    features,
    activeLayers,
    selectedProvinceId,
    selectedFeatureId,
    onSelectProvince,
    onSelectFeature,
  } = props;

  const filteredFeatures = features.filter((feat: GeographicalFeature) => {
    if (activeLayers.includes('all')) return true;
    return activeLayers.includes(feat.category);
  });

  return (
    <View style={styles.container}>
      <Svg viewBox="0 0 1000 450" style={styles.svg}>
        <Rect width="1000" height="450" fill="#E2E8F0" rx="16" />

        <SvgText x="500" y="40" fill="#94A3B8" fontSize="14" fontWeight="bold" textAnchor="middle">
          KARADENİZ
        </SvgText>
        <SvgText x="500" y="420" fill="#94A3B8" fontSize="14" fontWeight="bold" textAnchor="middle">
          AKDENİZ
        </SvgText>
        <SvgText x="60" y="240" fill="#94A3B8" fontSize="14" fontWeight="bold" textAnchor="middle">
          EGE DENİZİ
        </SvgText>

        {/*
          ========================================================
          LAYER 1: PROVINCES (<G id="provinces">)
          TODO: Antigravity - 81 ilin tam SVG path d="..." verileri
          aşağıdaki örnek path'lerin yerine enjekte edilecektir.
          ========================================================
        */}
        <G id="provinces">
          {provinces.map((prov: Province) => {
            const isSelected = selectedProvinceId === prov.id;
            return (
              <G key={prov.id} onPress={() => onSelectProvince(prov)}>
                {prov.svgPath ? (
                  <Path
                    d={prov.svgPath}
                    fill={isSelected ? '#10B981' : '#FFFFFF'}
                    stroke="#0F172A"
                    strokeWidth={isSelected ? '3' : '1.5'}
                    opacity={0.9}
                  />
                ) : (
                  <Circle
                    cx={prov.centerCoords.x}
                    cy={prov.centerCoords.y}
                    r="25"
                    fill={isSelected ? '#10B981' : '#FFFFFF'}
                    stroke="#0F172A"
                    strokeWidth="2"
                  />
                )}
                <SvgText
                  x={prov.centerCoords.x}
                  y={prov.centerCoords.y + 4}
                  fill={isSelected ? '#FFFFFF' : '#0F172A'}
                  fontSize="12"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {prov.name}
                </SvgText>
              </G>
            );
          })}
        </G>

        {/*
          ========================================================
          LAYER 2: MARKERS / FEATURES (<G id="markers">)
          Katman filtreleri açık olduğunda haritada beliren noktalar.
          ========================================================
        */}
        <G id="markers">
          {filteredFeatures.map((feat: GeographicalFeature) => {
            const isSelected = selectedFeatureId === feat.id;
            return (
              <G key={feat.id} onPress={() => onSelectFeature(feat)}>
                <Circle
                  cx={feat.coords.x}
                  cy={feat.coords.y}
                  r={isSelected ? '18' : '12'}
                  fill={isSelected ? 'rgba(245, 158, 11, 0.4)' : 'rgba(16, 185, 129, 0.3)'}
                />
                <Circle
                  cx={feat.coords.x}
                  cy={feat.coords.y}
                  r="8"
                  fill={isSelected ? '#F59E0B' : '#10B981'}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
                <SvgText
                  x={feat.coords.x}
                  y={feat.coords.y - 12}
                  fill="#0F172A"
                  fontSize="10"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {feat.title}
                </SvgText>
              </G>
            );
          })}
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 1000 / 450,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  svg: {
    width: '100%',
    height: '100%',
  },
});
