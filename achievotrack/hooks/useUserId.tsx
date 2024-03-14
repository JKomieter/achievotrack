import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

export const useUserId = () => {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserId = async () => {
            const id = await AsyncStorage.getItem('userId');
            setUserId(id);
        };

        fetchUserId();
    }, []);

    return userId;
};