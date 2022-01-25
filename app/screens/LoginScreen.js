import React from "react";
import { AppForm, AppFormField, SubmitButton } from "../components/forms/index";
import { signInWithEmailAndPassword } from "firebase/auth";
import { StyleSheet, Image } from "react-native";
import { auth } from "../../firebase/firebase";
import Screen from "../components/Screen";
import * as Yup from "yup";
import routes from "../navigation/routes";

// validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

export default function LoginScreen({ navigation }) {
  const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed in", user);
        navigation.navigate(routes.APP);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log("Error signing in", errorMessage);
      });
  };
  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo-red.png")} />
      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={({ email, password }) => handleLogin(email, password)}
        validationSchema={validationSchema}
      >
        <AppFormField
          placeholder="Email"
          icon="email"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          textContentType="emailAddress"
          name="email"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          placeholder="Password"
          textContentType="password"
          secureTextEntry
          name="password"
        />
        <SubmitButton title="Login" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  container: {
    padding: 10,
  },
});
