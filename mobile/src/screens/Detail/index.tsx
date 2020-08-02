import React, { useEffect, useState } from "react";
import {
  Image,
  Linking,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";

import { Feather as Icon, FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as MailComposer from "expo-mail-composer";

import api from "../../services/api";
import styles from "./styles";

interface RouteParams {
  pointId: string;
}

interface Data {
  point: {
    image: string;
    imageUrl: string;
    name: string;
    email: string;
    whatsapp: string;
    city: string;
    uf: string;
  };
  items: {
    title: string;
  }[];
}

const Detail: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as RouteParams;

  const [data, setData] = useState<Data>({} as Data);

  useEffect(() => {
    api
      .get(`/points/${routeParams.pointId}`)
      .then((response) => setData(response.data));
  }, []);

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleWhatsapp() {
    const text = `Olá, tudo bem?\nPoderia me mandar mais informações sobre a coleta de materiais recicláveis?`;
    Linking.openURL(
      `whatsapp://send?phone=+55${data.point.whatsapp}&text=${text}`
    );
  }

  function handleComposeMail() {
    MailComposer.composeAsync({
      subject: "Interesse na coleta de materiais recicláveis",
      recipients: [data.point.email],
    });
  }

  if (!data.point) return null;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" color="#34cb79" size={20} />
        </TouchableOpacity>

        <Image
          style={styles.pointImage}
          source={{ uri: data.point.imageUrl }}
        />

        <Text style={styles.pointName}>{data.point.name}</Text>
        <Text style={styles.pointItems}>
          {data.items.map((item) => item.title).join(", ")}
        </Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>
            {`${data.point.city}, ${data.point.uf}`}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleWhatsapp}>
          <FontAwesome name="whatsapp" color="#fff" size={20} />
          <Text style={styles.buttonText}>Whatsapp</Text>
        </RectButton>

        <RectButton style={styles.button} onPress={handleComposeMail}>
          <Icon name="mail" color="#fff" size={20} />
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  );
};

export default Detail;
