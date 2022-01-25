import { StyleSheet, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import Screen from "../components/Screen";
import Card from "../components/Card";
import colors from "../config/colors";
import routes from "../navigation/routes";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import randomImage from "../assets/jacket.jpg";

export default function ListingsScreen({ navigation }) {
  const [dbListings, setDbListings] = useState([]);

  const getListings = async () => {
    const dbListings = [];
    const querySnapshot = await getDocs(collection(db, "listings"));
    querySnapshot.forEach((doc) => {
      dbListings.push({ id: doc.id, ...doc.data() });
    });
    setDbListings(dbListings);
  };

  // const addListing = async (title, price) => {
  //   try {
  //     const docRef = await addDoc(collection(db, "listings"), {
  //       word: text,
  //     });
  //     console.log("Document written with ID: ", docRef.id);
  //     getWords();
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // };

  useEffect(() => {
    getListings();
  }, []);

  return (
    <Screen style={styles.screen}>
      <FlatList
        data={dbListings}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={"$" + item.price}
            image={randomImage}
            onPress={() => {
              navigation.navigate(routes.LISTING_DETAILS, item);
            }}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
    padding: 20,
  },
});
