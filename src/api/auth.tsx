import axios from "./axios";

export const registerUser = async (formData: any) => {
  try {
    const response = await axios.post("/auth/register", formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (formData: any) => {
  try {
    const response = await axios.post("/auth/login", formData, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const validateSessionToken = async (storedToken: string) => {
  try {
    const response = await axios.get("/auth/validate", {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
