import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "@/theme";

interface ButtonHeaderProps {
  buttons: (
    | {
        label: string;
        onPress: () => void;
        icon?: JSX.Element;
        customElement?: undefined;
      }
    | {
        label?: undefined;
        onPress?: undefined;
        icon?: undefined;
        customElement: JSX.Element;
      }
  )[];
}

export default function ButtonHeader({ buttons }: ButtonHeaderProps) {
  return (
    <View style={styles.container}>
      {buttons.map((button, index) => (
        <View key={index} style={styles.button}>
          {button.customElement ? (
            button.customElement
          ) : (
            <TouchableOpacity
              style={styles.buttonInner}
              onPress={button.onPress}
            >
              {button.icon && <View style={styles.icon}>{button.icon}</View>}
              <Text style={styles.buttonText}>{button.label}</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: colors.background,
    padding: 8,
    justifyContent: "space-around",
  },
  button: {
    width: 150,
    height: 40,
    margin: 4,
    borderRadius: 6,
    backgroundColor: colors.gray,
    justifyContent: "center",
  },
  buttonInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  icon: {
    marginRight: 6,
  },
  buttonText: {
    color: colors.text,
    fontWeight: "500",
  },
});
