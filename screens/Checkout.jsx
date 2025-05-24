import { SafeAreaView, View, Text, Image, TouchableOpacity, FlatList, Alert, Modal } from "react-native";
import BackButton from "../components/BackButton";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity, setTypePayment, clearCart, actTrackOrder } from "../redux/slices/cart/cartSlice";
import ModalWrapper from "../components/ModalWrapper"
import { toggleModalWrapper, setChangedBehaviorModalWrapper, setItemModalWrapper } from "../redux/slices/General/generalSlice";
import actApiPayment from "../redux/slices/cart/act/actApiPayment.js";
import { useStripe } from "@stripe/stripe-react-native";
import { useState, useCallback, useEffect } from "react";
import { WebView } from 'react-native-webview';

// API URL constant
const API_URL = 'http://192.168.1.4:5500';

const Checkout = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { items, total, typePayment } = useSelector((state) => state.carts);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { typeModal } = useSelector((state) => state.generals);
  const [isPaymentPending, setIsPaymentPending] = useState(false);
  const [paymentSheetInitialized, setPaymentSheetInitialized] = useState(false);
  const [paypalUrl, setPaypalUrl] = useState(null);
  const [paypalOrderId, setPaypalOrderId] = useState(null);

  const handleDeleteItem = (item) => {
    dispatch(toggleModalWrapper(true))
  }

  const resetPaymentState = useCallback(() => {
    setPaymentSheetInitialized(false);
    setIsPaymentPending(false);
    dispatch(setTypePayment(null));
    dispatch(setItemModalWrapper(null));
    dispatch(setChangedBehaviorModalWrapper(false));
    dispatch(clearCart());
  }, [dispatch]);

  const initializeStripeSheet = async () => {
    try {
      const response = await dispatch(
        actApiPayment({
          amount: Math.floor(total * 100),
          serverNode: true,
        })
      );

      if (!response.payload || response.error) {
        throw new Error(response.error || "Failed to create payment intent");
      }

      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: response.payload.paymentIntent,
        merchantDisplayName: "EggsXpress",
        returnURL: "your-app://stripe-redirect",
        defaultBillingDetails: {
          name: "Amine Hatar",
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      setPaymentSheetInitialized(true);
      return true;
    } catch (error) {
      console.error("Payment initialization error:", error);
      return false;
    }
  };

  const handleStripePayment = async () => {
    try {
      if (!paymentSheetInitialized) {
        const initialized = await initializeStripeSheet();
        if (!initialized) {
          throw new Error("Failed to initialize payment");
        }
      }

      const { error } = await presentPaymentSheet();
      
      if (error) {
        if (error.code === 'Canceled') {
          setIsPaymentPending(false);
          return false;
        }
        throw new Error(error.message);
      }

      return true;
    } catch (error) {
      Alert.alert("Payment Error", error.message);
      return false;
    }
  };

  const handlePayPal = async () => {
    try {
      const response = await fetch(`${API_URL}/payments/paypal/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'en-US'
        },
        body: JSON.stringify({
          amount: Math.floor(total * 100)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || 'Failed to create order');
      }

      if (data.orderId) {
        setPaypalOrderId(data.orderId);
        setPaypalUrl(`https://www.sandbox.paypal.com/checkoutnow?token=${data.orderId}&locale.x=en_US&country.x=US&locale=en_US`);
        return true;
      }
      return false;
    } catch (error) {
      console.error('PayPal Error:', error);
      Alert.alert('Error', 'Could not initiate PayPal checkout');
      return false;
    }
  };

  const handlePayPalResponse = async (response) => {
    const { url } = response;
    
    if (url.includes('success') && paypalOrderId) {
      try {
        const response = await fetch(`${API_URL}/payments/paypal/capture-order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            orderId: paypalOrderId
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.details || 'Failed to capture payment');
        }

        if (data.success) {
          setPaypalUrl(null);
          setPaypalOrderId(null);
          resetPaymentState();
          Alert.alert(
            "Success",
            "Payment successful!",
            [{ text: "OK", onPress: () => navigation.navigate("MainTabs") }]
          );
        }
      } catch (error) {
        console.error('Capture Error:', error);
        Alert.alert('Error', 'Could not complete payment');
        setPaypalUrl(null);
        setPaypalOrderId(null);
      }
    } else if (url.includes('cancel')) {
      setPaypalUrl(null);
      setPaypalOrderId(null);
      Alert.alert('Payment Cancelled', 'You cancelled the payment');
    }
  };

  const handleCashPayment = async () => {
    try {
      const orderItems = items.map(item => ({
        foodId: item.foodId,
        quantity: item.quantity
      }));

      const response = await dispatch(actTrackOrder({
        items: orderItems,
        paymentMethod: 'cash'
      }));

      if (response.error) {
        throw new Error(response.error);
      }

      Alert.alert(
        "Success",
        "Cash payment order placed successfully!",
        [{ text: "OK", onPress: () => navigation.navigate("MainTabs") }]
      );
      return true;
    } catch (error) {
      Alert.alert("Error", error.message);
      return false;
    }
  };

  const processPayment = async (selectedPaymentType) => {
    if (isPaymentPending) return;
    setIsPaymentPending(true);

    try {
      let success = false;
      
      switch(selectedPaymentType.toLowerCase()) {
        case 'stripe':
          success = await handleStripePayment();
          break;
        case 'paypal':
          success = await handlePayPal();
          break;
        case 'cash':
          success = await handleCashPayment();
          break;
        default:
          throw new Error("Invalid payment method");
      }

      if (success) {
        resetPaymentState();
        navigation.navigate("MainTabs");
      } else {
        dispatch(setTypePayment(null));
        setIsPaymentPending(false);
        setPaymentSheetInitialized(false);
      }
    } catch (error) {
      resetPaymentState();
      Alert.alert("Payment Error", error.message);
    }
  };

  useEffect(() => {
    if (typePayment && typeModal === "PAYMENT_METHOD" && !isPaymentPending) {
      processPayment(typePayment);
    }
  }, [typePayment, typeModal, isPaymentPending]);

  const handlePayment = useCallback(() => {
    if (isPaymentPending) return;
    
    dispatch(toggleModalWrapper(true));
    dispatch(setChangedBehaviorModalWrapper(true));
    dispatch(setItemModalWrapper({ 
      typeModal: "PAYMENT_METHOD", 
      itemModal: { total: finalTotal }
    }));
  }, [isPaymentPending, finalTotal]);

  const deliveryFee = items.length > 0 ? 4.99 : 0;
  const finalTotal = total + deliveryFee;

  const renderCartItem = ({ item }) => (
    <View className="px-4 mb-4">
      <View className="bg-white shadow-xl shadow-gray-300/40 rounded-3xl p-6 relative overflow-hidden">
        <TouchableOpacity 
          className="absolute right-0 top-0 bg-[#f9c32d] w-14 h-14 rounded-bl-3xl justify-center items-center shadow-lg shadow-yellow-400/50"
          onPress={() => handleDeleteItem(item)}
        >
          <Ionicons name="trash-outline" size={20} color="white" />
        </TouchableOpacity>
        
        <View className="flex-row items-center gap-5">
          <View className="relative">
            <View className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-gray-50 shadow-lg shadow-yellow-400/50">
              <Image
                source={{ uri: item.imageUrl }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <View className="absolute -inset-0.5 bg-yellow-400/20 rounded-2xl blur-sm -z-10" />
          </View>

          <View className="flex-1">
            <View className="mb-4">
              <Text className="text-xl font-bold text-gray-900 mb-2">
                {item.title}
              </Text>
              <Text className="text-sm text-gray-500 leading-5">
                {item.description}
              </Text>
            </View>

            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-sm text-gray-500 mb-1">Price</Text>
                <Text className="text-2xl font-bold text-gray-900">${item.price.toFixed(2)}</Text>
              </View>
              <View className="flex-row items-center bg-primary rounded-xl px-4 py-2">
                <TouchableOpacity
                  onPress={() => dispatch(decreaseQuantity(item))}
                  disabled={item.quantity <= 1}
                  className={`w-8 h-8 items-center justify-center ${item.quantity <= 1 ? 'opacity-50' : ''}`}
                >
                  <Text className="text-2xl text-darkText">-</Text>
                </TouchableOpacity>
                <Text className="text-xl font-bold text-darkText mx-4">
                  {item.quantity}
                </Text>
                <TouchableOpacity
                  onPress={() => dispatch(increaseQuantity(item))}
                  className="w-8 h-8 items-center justify-center"
                >
                  <Text className="text-2xl text-darkText">+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-bgLight">
      <View className="mb-6">
        <BackButton goBack={() => navigation.goBack()} color="black" />
      </View>

      <View className="px-4 flex-row items-center gap-4 my-8">
        <View className="w-14 h-14 rounded-full bg-white shadow-sm justify-center items-center">
          <Ionicons name="navigate-outline" size={28} color="#f9c32d" />
        </View>
        <View className="flex-1">
          <Text className="text-sm text-gray-500 mb-1">
            Delivery Address
          </Text>
          <Text className="text-base font-semibold text-darkText">
            Downtown City, California USA
          </Text>
        </View>
      </View>

      <FlatList
        data={items}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.foodId}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 16 }}
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center">
            <Text className="text-xl text-gray-500">Your cart is empty</Text>
          </View>
        )}
      />

      {items.length > 0 && (
        <View className="px-4 py-4shadow-2xl shadow-gray-400/20">
          <TouchableOpacity 
            className="w-full bg-[#f9c32d] py-4 rounded-2xl active:opacity-90"
            onPress={() => handlePayment()}
          >
            <Text className="text-center text-darkText font-bold text-lg">
              Process To Payment · ${finalTotal.toFixed(2)}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <ModalWrapper />

      {paypalUrl ? (
        <Modal visible={!!paypalUrl} animationType="slide">
          <SafeAreaView style={{ flex: 1 }}>
            <View className="flex-row justify-between items-center p-4 bg-white">
              <Text className="text-lg font-bold">PayPal Checkout</Text>
              <TouchableOpacity 
                onPress={() => {
                  setPaypalUrl(null);
                  setPaypalOrderId(null);
                }}
                className="p-2"
              >
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <WebView
              source={{ 
                uri: paypalUrl,
                headers: {
                  'Accept-Language': 'en-US',
                  'Content-Language': 'en-US'
                }
              }}
              onNavigationStateChange={handlePayPalResponse}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}
              injectedJavaScript={`
                document.documentElement.lang = 'en';
                document.documentElement.setAttribute('lang', 'en');
              `}
            />
          </SafeAreaView>
        </Modal>
      ) : null}
    </SafeAreaView>
  );
};

export default Checkout;
