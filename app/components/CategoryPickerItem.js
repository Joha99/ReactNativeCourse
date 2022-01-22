import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Icon from "./Icon";
import AppText from "./AppText";

export default function CategoryPickerItem({ item, onPress }) {
  return (
    <View style={styles.container}>
      <Icon backgroundColor={item.backgroundColor} name={item.icon} size={80} />
      <AppText style={styles.label}>{item.label}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "33%",
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  label: {
    marginTop: 5,
    textAlign: "center",
  },
});
