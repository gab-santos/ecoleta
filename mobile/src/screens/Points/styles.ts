import { StyleSheet } from "react-native";

import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
  },

  emoji: {
    fontSize: 20,
  },

  title: {
    fontSize: 20,
    fontFamily: "Ubuntu700Bold",
    marginLeft: 10,
  },

  description: {
    color: "#6C6C80",
    fontSize: 16,
    marginTop: 4,
    fontFamily: "Roboto400Regular",
  },

  mapContainer: {
    flex: 1,
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 16,
  },

  map: {
    width: "100%",
    height: "100%",
  },

  mapMarker: {
    width: 90,
    // height: "100%",
    alignItems: "center",
  },

  mapMarkerContainer: {
    flex: 1,
    width: 90,
    height: "100%",
    backgroundColor: "#34CB79",
    flexDirection: "column",
    borderRadius: 8,
    overflow: "hidden",
    alignItems: "center",
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: "cover",
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: "Roboto400Regular",
    color: "#FFF",
    fontSize: 13,
    lineHeight: 15,
    padding: 2,
    textAlign: "center",
  },

  mapMarkerArrowDown: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",

    borderLeftWidth: 10,
    borderLeftColor: "transparent",

    borderRightWidth: 10,
    borderRightColor: "transparent",

    borderTopWidth: 10,
    borderTopColor: "#34CB79",
  },

  itemsContainer: {
    flexDirection: "row",
    marginTop: 16,
    marginBottom: 32,
  },

  item: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#eee",
    height: 120,
    width: 120,
    borderRadius: 8,
    // paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "center",
  },

  selectedItem: {
    borderColor: "#34CB79",
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: "Roboto400Regular",
    textAlign: "center",
    fontSize: 13,
  },
});

export default styles;
