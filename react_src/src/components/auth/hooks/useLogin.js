import React,{useState, useEffect} from "react";
import axios from "axios";

export default function useLogin () {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        axios
            .get("http://localhost:3001/auth/check", { withCredentials: true })
            .then(() => {
                setAuthenticated(true);
            })
            .catch((err) => {
                if (!(err.response && err.response.status)) {
                    alert("An error occured while checking authentication");
                }
                setAuthenticated(false);
            });
    }, []);

    return [authenticated, setAuthenticated];
};
