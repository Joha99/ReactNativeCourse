import React from "react";
import { AppForm, AppFormField, SubmitButton } from "../components/forms/index";
import { StyleSheet } from "react-native";
import Screen from "../components/Screen";
import * as Yup from "yup";
import { auth, db } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

// validation schema
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().label("First Name"),
  lastName: Yup.string().required().label("Last Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

export default function RegisterScreen() {
  const handleRegister = async (firstName, lastName, email, password) => {
    // create user in firebase authentication
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User created", user);
        alert("Successful register");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log("Error registering", errorMessage);
        alert("Unsuccessful register");
      });

    //create user in firestore
    const docRef = await addDoc(collection(db, "users"), {
      firstName: firstName,
      lastName: lastName,
      email: email,
    })
      .then((docRef) => alert("Added user in Firestore with ID", docRef.id))
      .catch((error) => {
        const errorMessage = error.message;
        alert("Unsuccessful at adding user to Firestore", errorMessage);
      });

    console.log("Document written with ID: ", docRef.id);
  };

  return (
    <Screen style={styles.container}>
      <AppForm
        initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
        onSubmit={({ firstName, lastName, email, password }) =>
          handleRegister(firstName, lastName, email, password)
        }
        validationSchema={validationSchema}
      >
        <AppFormField
          placeholder="First Name"
          icon="account"
          autoCapitalize="none"
          autoCorrect={false}
          name="firstName"
        />
        <AppFormField
          placeholder="Last Name"
          icon="account"
          autoCapitalize="none"
          autoCorrect={false}
          name="lastName"
        />
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
        <SubmitButton title="Register" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
