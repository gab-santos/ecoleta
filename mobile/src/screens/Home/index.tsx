import React, { useState, useEffect } from "react";
import { Alert, Image, ImageBackground, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Select, { Item } from "react-native-picker-select";

import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import homeBackground from "../../assets/home-background.png";
import logo from "../../assets/logo.png";
import ibge from "../../services/ibge";
import styles from "./styles";

const Home: React.FC = () => {
  const navigation = useNavigation();

  const [ufs, setUfs] = useState<Item[]>([]);
  const [citys, setCitys] = useState<Item[]>([]);

  const [selectedUf, setSelectedUf] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    ibge.getUfs().then((response) => {
      const ufInitials: Item[] = response.data.map((uf) => {
        return { label: uf.sigla, value: uf.sigla };
      });
      setUfs(ufInitials);
    });
  }, []);

  useEffect(() => {
    if (selectedUf === "0") return;
    ibge.getCitys(selectedUf).then((response) => {
      const cityNames: Item[] = response.data.map((city) => {
        return { label: city.nome, value: city.nome };
      });
      setCitys(cityNames);
    });
  }, [selectedUf]);

  function handleNavigationToPoints() {
    if (!selectedUf || !selectedCity) {
      Alert.alert(
        "Opss...",
        "Precisamos que você selecione o estado e a cidade!"
      );
      return;
    }
    navigation.navigate("Points", {
      uf: selectedUf,
      city: selectedCity,
    });
  }

  return (
    <ImageBackground
      source={homeBackground}
      imageStyle={{ width: 274, height: 368 }}
      style={styles.container}
    >
      <View style={styles.main}>
        <Image source={logo} />
        <Text style={styles.title}>Seu marketplace de coleta de resíduo</Text>
        <Text style={styles.description}>
          Ajudamos pessoas a encontrar pontos de coleta de forma eficiente.
        </Text>
      </View>

      <View style={styles.footer}>
        <Select
          placeholder={{
            label: "Selecione o estado (UF)",
            value: "",
            color: "gray",
          }}
          style={{
            inputAndroid: {
              ...styles.input,
            },
            iconContainer: {
              ...styles.inputIcon,
            },
          }}
          Icon={() => <Icon name="chevron-down" color="gray" size={24} />}
          useNativeAndroidPickerStyle={false}
          value={selectedUf}
          onValueChange={setSelectedUf}
          items={ufs}
        />
        <Select
          placeholder={{
            label: "Selecione a cidade",
            value: "",
            color: "gray",
          }}
          style={{
            inputAndroid: {
              ...styles.input,
            },
            iconContainer: {
              ...styles.inputIcon,
            },
          }}
          Icon={() => <Icon name="chevron-down" color="gray" size={24} />}
          useNativeAndroidPickerStyle={false}
          value={selectedCity}
          onValueChange={setSelectedCity}
          items={citys}
        />
        <RectButton style={styles.button} onPress={handleNavigationToPoints}>
          <View style={styles.buttonIcon}>
            <Icon name="arrow-right" color="#fff" size={24} />
          </View>
          <Text style={styles.buttonText}>Entrar</Text>
        </RectButton>
      </View>
    </ImageBackground>
  );
};

export default Home;
