import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  ColorSchemeName,
} from "react-native";
import { FC, useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { AntDesign } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { IBarcodeScanner } from "@/types/barcodeScanner";

const BarcodeScanner: FC<IBarcodeScanner> = (props) => {
  const colorScheme: ColorSchemeName = useColorScheme();

  const { searchedBook, setSearchedBook, closeBarcodeScanner } = props;
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setSearchedBook(data);
    closeBarcodeScanner();
  };

  if (hasPermission === null) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: Colors[colorScheme].background,
          },
        ]}
      >
        <ActivityIndicator color={Colors[colorScheme].barbie} size="large" />
        <Text
          style={[
            styles.scannerText,
            {
              color: Colors[colorScheme].ken,
            },
          ]}
        >
          Requesting for camera permission
        </Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: Colors[colorScheme].background,
          },
        ]}
      >
        <Text
          style={[
            styles.scannerText,
            {
              color: Colors[colorScheme].ken,
            },
          ]}
        >
          No access to Camera
        </Text>
      </View>
    );
  }
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: Colors[colorScheme].background,
        },
      ]}
    >
      <BarCodeScanner
        onBarCodeScanned={searchedBook ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        barCodeTypes={[
          BarCodeScanner.Constants.BarCodeType.ean13,
          BarCodeScanner.Constants.BarCodeType.ean8,
        ]}
      />
      <Pressable style={styles.closeBtn} onPress={closeBarcodeScanner}>
        <AntDesign
          name="closecircle"
          size={35}
          color={Colors[colorScheme].background}
        />
      </Pressable>
      <View
        style={[
          styles.scanner,
          {
            borderColor: Colors[colorScheme].barbie,
          },
        ]}
      >
        <Text
          style={[
            styles.scannerText,
            {
              color: Colors[colorScheme].ken,
            },
          ]}
        >
          scan the Barcode on your book
        </Text>
      </View>
    </View>
  );
};

export default BarcodeScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  closeBtn: {
    position: "absolute",
    top: 50,
    right: 20,
  },
  scanner: {
    height: 300,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderStyle: "dashed",
  },
  scannerText: {
    fontSize: 18,
    fontWeight: "500",
    textTransform: "capitalize",
  },
});
