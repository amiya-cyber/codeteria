import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const APIContext = createContext();

export const APIProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [dark, setDark] = useState(false);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentCheat, setCurrentCheat] = useState();
    const [allCheats, setAllCheats] = useState();
    const [problems, setAllProblems] = useState();
    const [dsProblems, setDsProblems] = useState([]);
    const navigate = useNavigate();
    const url = import.meta.env.VITE_BASE_URL;

    // Check if user is authenticated on initial load
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    // ################################ USER Authentication ############################

    const signup = async (payload) => {
        setLoading(true);
        try {
            const response = await axios.post(`${url}/auth/register`, payload);
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            setError(error.response ? error.response.data.message : "Signup failed");
            console.error(error);
        }
    };

    const login = async (userData) => {
        setLoading(true);
        try {
            const response = await axios.post(`${url}/auth/login`, userData);
            setIsAuthenticated(true);
            setLoading(false);
            localStorage.setItem("token", JSON.stringify(response.data.token));
            navigate("/cheats");
        } catch (error) {
            setLoading(false);
            setError(error.response ? error.response.data.message : "Login failed");
            alert(error.response ? error.response.data.message : "Login failed");
        }
    };

    // ################################### for cheats API ####################################

    const getAllCheats = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${url}/cheat`);
            setLoading(false);
            setAllCheats(response.data);
            return response.data.allcheats;
        } catch (error) {
            setLoading(false);
            setError(error.response ? error.response.data.message : "Failed to fetch cheats");
            console.error(error);
        }
    };

    // ################################## for machine coding round ###########################

    const getAllProblems = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${url}/challenge`);
            setLoading(false);
            setAllProblems(response.data);
            return response.data;
        } catch (error) {
            setLoading(false);
            setError(error.response ? error.response.data.message : "Failed to fetch problems");
            console.error(error);
        }
    };

    // ################################## for DS problems #####################################

    const getAllDSProblems = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${url}/dsproblem`);
            setLoading(false);
            setDsProblems(response.data.problems);
            return response.data;
        } catch (error) {
            setLoading(false);
            setError(error.response ? error.response.data.message : "Failed to fetch DS problems");
            console.error(error);
        }
    };

    // ################################## API Context Provider ################################

    return (
        <APIContext.Provider
            value={{
                login,
                signup,
                isAuthenticated,
                setIsAuthenticated,
                loading,
                error,
                currentCheat,
                setCurrentCheat,
                setCount,
                count,
                allCheats,
                setAllCheats,
                getAllCheats,
                getAllProblems,
                problems,
                setAllProblems,
                dsProblems,
                setDsProblems,
                dark,
                setDark,
                getAllDSProblems
            }}
        >
            {children}
        </APIContext.Provider>
    );
};

export const useAPI = () => {
    return useContext(APIContext);
};
