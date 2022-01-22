import React from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import CategoryPickerItem from "../components/CategoryPickerItem";
import PickerItem from "../components/PickerItem";
import {
  AppForm,
  AppFormField,
  AppFormPicker,
  SubmitButton,
} from "../components/forms";
import Screen from "../components/Screen";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
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
  { label: "Others", value: 9, backgroundColor: "gray", icon: "lock" },
];

function ListingEditScreen() {
  return (
    <Screen style={styles.container}>
      <AppForm
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
        }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
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
