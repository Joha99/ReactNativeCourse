import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  AppForm,
  AppFormField,
  AppFormPicker,
  SubmitButton,
} from "../components/forms";
import Screen from "../components/Screen";
import FormImagePicker from "../components/forms/FormImagePicker";
import * as Yup from "yup";
import { auth, db } from "../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import routes from "../navigation/routes";


const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().required().label("Description"),
  category: Yup.object().nullable().label("Category"),
  // images: Yup.array().required().min(1, "Please select at least one image"),
  images: Yup.array(),
});

const categories = [
  { label: "Furniture", value: 1, backgroundColor: "red", icon: "apps" },
  { label: "Cars", value: 2, backgroundColor: "orange", icon: "email" },
  { label: "Camera", value: 3, backgroundColor: "yellow", icon: "lock" },
  { label: "Games", value: 4, backgroundColor: "green", icon: "lock" },
  { label: "Clothing", value: 5, backgroundColor: "blue", icon: "lock" },
  { label: "Sports", value: 6, backgroundColor: "blue", icon: "lock" },
  { label: "Movies & Music", value: 7, backgroundColor: "blue", icon: "lock" },
  { label: "Books", value: 8, backgroundColor: "purple", icon: "lock" },
  { label: "Electronics", value: 9, backgroundColor: "brown", icon: "lock" },
  { label: "Health", value: 10, backgroundColor: "black", icon: "lock" },
  { label: "Pets", value: 11, backgroundColor: "white", icon: "lock" },
  { label: "Others", value: 12, backgroundColor: "gray", icon: "lock" },
];

function ListingEditScreen({ navigation }) {
  const addListing = async (listing) => {
    try {
      const docRef = await addDoc(collection(db, "listings"), {
        title: listing.title,
        price: listing.price,
        description: listing.description,
        owner: auth.currentUser.displayName,
      });
      console.log("Document written with ID: ", docRef.id);
      alert("Succesfully added new listing");
    } catch (e) {
      console.error("Error adding new listing: ", e);
    }
  };

  return (
    <Screen style={styles.container}>
      <AppForm
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
          images: [],
        }}
        onSubmit={(values) => {
          console.log(values);
          addListing(values);
          navigation.navigate(routes.FEED);
        }}
        validationSchema={validationSchema}
      >
        <FormImagePicker name="images" />
        <AppFormField maxLength={255} name="title" placeholder="Title" />
        <AppFormField
          keyboardType="numeric"
          maxLength={8}
          name="price"
          placeholder="Price"
          width={120}
        />
        <AppFormPicker
          items={categories}
          name="category"
          placeholder="Category"
          width="50%"
          // PickerItemComponent={CategoryPickerItem}
          // numberOfColumns={3}
          // PickerItemComponent={PickerItem}
        />
        <AppFormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
        <SubmitButton title="Post" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default ListingEditScreen;
