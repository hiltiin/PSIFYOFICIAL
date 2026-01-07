import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../Styles/styles'; // Importando o CSS

export default function CustomInput({ label, secureTextEntry, showIcon }) {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>{label}</Text>
      </View>
      <TextInput 
        style={styles.input}
        secureTextEntry={secureTextEntry}
      />
      {showIcon && (
        <TouchableOpacity style={styles.iconContainer}>
          <Text style={styles.iconText}>ⓧ</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}