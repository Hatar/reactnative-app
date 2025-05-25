import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

const useIsAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          setIsAdmin(false)
        } else {
          const decoded = jwtDecode(token);
          setIsAdmin(decoded?.role === "admin")
        }
      } catch (error) {
        setIsAdmin(false)
      } finally {
        setLoading(false)
      }
    };

    checkAdmin();
  }, [])

  if (loading) {
    return null
  }

  return isAdmin
};

export default useIsAdmin;
