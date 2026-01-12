import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../Styles/styles';

export default function CustomInput({
  label,
  secureTextEntry = false,
  showIcon = false,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  autoCapitalize,
  onClear,
}) {
  const [visible, setVisible] = useState(!secureTextEntry);

  return (
    <View style={styles.inputContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>{label}</Text>
      </View>
      <TextInput
        style={styles.input}
        secureTextEntry={!visible && secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
      {showIcon && (
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setVisible((v) => !v)}
        >
          <Text style={styles.iconText}>{visible ? '🙈' : '👁️'}</Text>
        </TouchableOpacity>
      )}
      {!showIcon && onClear && (
        <TouchableOpacity style={styles.iconContainer} onPress={onClear}>
          <Text style={styles.iconText}>ⓧ</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}