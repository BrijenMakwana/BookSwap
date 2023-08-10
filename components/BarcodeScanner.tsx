import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { AntDesign } from "@expo/vector-icons";

const BarcodeScanner = (props) => {
  const { searchedBook, setSearchedBook, closeBarcodeScanner } = props;
  const [hasPermission, setHasPermission] = useState(null);

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
      <View style={styles.container}>
        <ActivityIndicator color="#e0218a" size="large" />
        <Text style={styles.scannerText}>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.scannerText}>No access to Camera</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={searchedBook ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        barCodeTypes={[
          BarCodeScanner.Constants.BarCodeType.ean13,
          BarCodeScanner.Constants.BarCodeType.ean8,
        ]}
      />
      <Pressable style={styles.closeBtn} onPress={closeBarcodeScanner}>
        <AntDesign name="closecircle" size={35} color="#fff" />
      </Pressable>
      <View style={styles.scanner}>
        <Text style={styles.scannerText}>scan the Barcode on your book</Text>
      </View>
    </View>
  );
};

export default BarcodeScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    borderColor: "#e0218a",
    borderStyle: "dashed",
  },
  scannerText: {
    fontSize: 18,
    color: "#0AF6EE",
    fontWeight: "500",
    textTransform: "capitalize",
  },
});
