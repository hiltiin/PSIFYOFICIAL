import React, { useMemo, useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const EMOJIS = [
  '🧠',
  '📝',
  '📓',
  '📌',
  '🌟',
  '🌈',
  '💙',
  '💚',
  '💛',
  '💜',
  '🤍',
  '😊',
  '😌',
  '🙂',
  '😀',
  '🥳',
  '😴',
  '😢',
  '😡',
  '🤯',
  '🙏',
  '✨',
  '🍃',
  '🔥',
];

export default function DiarioEmojiSelectableIcon({
  style,
  tintColor,
  onPress,
  pickerTrigger = 'longPress',
  disabled = false,
  delayLongPress = 320,
  imageSource,
  value,
  onChange,
}) {
  const [open, setOpen] = useState(false);

  const emoji = typeof value === 'string' ? value : '';

  const flatStyle = useMemo(() => StyleSheet.flatten(style) || {}, [style]);
  const derivedTintColor = tintColor || flatStyle?.tintColor;

  const emojiSize = useMemo(() => {
    const w = Number(flatStyle?.width);
    const h = Number(flatStyle?.height);
    const s = Number.isFinite(w) ? w : Number.isFinite(h) ? h : 28;
    return Math.max(18, s);
  }, [flatStyle?.width, flatStyle?.height]);

  function openPicker() {
    if (disabled) return;
    setOpen(true);
  }

  async function chooseEmoji(nextEmoji) {
    if (typeof onChange === 'function') {
      await onChange(nextEmoji);
    }
    setOpen(false);
  }

  async function clearEmoji() {
    if (typeof onChange === 'function') {
      await onChange('');
    }
    setOpen(false);
  }

  const handlePress = () => {
    if (pickerTrigger === 'press') return openPicker();
    if (typeof onPress === 'function') return onPress();
  };

  const handleLongPress = () => {
    if (pickerTrigger === 'longPress') return openPicker();
  };

  return (
    <>
      <TouchableOpacity
        onPress={handlePress}
        onLongPress={handleLongPress}
        delayLongPress={delayLongPress}
        activeOpacity={0.8}
        disabled={disabled}
      >
        {emoji ? (
          <Text
            style={[
              styles.emoji,
              {
                fontSize: emojiSize,
                lineHeight: Math.round(emojiSize * 1.1),
                color: derivedTintColor || '#fff',
              },
            ]}
          >
            {emoji}
          </Text>
        ) : (
          <Image
            source={imageSource || require('../assets/diario.png')}
            style={[style, derivedTintColor ? { tintColor: derivedTintColor } : null]}
            resizeMode="contain"
          />
        )}
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <View style={styles.backdrop}>
          <View style={styles.sheet}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Escolha um emoji</Text>
              <TouchableOpacity onPress={() => setOpen(false)}>
                <Text style={styles.close}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
              {EMOJIS.map((e) => (
                <TouchableOpacity key={e} style={styles.cell} onPress={() => chooseEmoji(e)}>
                  <Text style={styles.cellEmoji}>{e}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity style={styles.clearBtn} onPress={clearEmoji}>
              <Text style={styles.clearText}>Voltar para o ícone padrão</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  emoji: {
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    padding: 18,
  },
  sheet: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    maxHeight: '70%',
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3A6B8E',
  },
  close: {
    fontSize: 18,
    color: '#3A6B8E',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingVertical: 6,
  },
  cell: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: '#F3F7FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellEmoji: {
    fontSize: 28,
  },
  clearBtn: {
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#7BA6C7',
    alignItems: 'center',
  },
  clearText: {
    color: '#fff',
    fontWeight: '700',
  },
});
