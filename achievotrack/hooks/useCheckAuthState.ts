import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function useCheckAuthState() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkIfLoggedIn = async () => {
            const userId = await AsyncStorage.getItem('userId');
            if (!userId) {
                router.push('/(auth)');
            }
            setIsLoading(false);
        };
        checkIfLoggedIn();
    }, []);

    return { isLoading }
}