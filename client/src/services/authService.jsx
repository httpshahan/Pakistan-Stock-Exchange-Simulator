// authService.js
import axios from "axios";

const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  register: async (name, email, password) => {
    try {
      const response = await axios.post("http://localhost:3000/api/auth/register", {
        username: name,
        email,
        password,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  adminLogin: async (adminEmail, adminPassword) => {
    try {
      const response = await axios.post("http://localhost:3000/api/auth/admin", {
        email: adminEmail,
        password: adminPassword,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // You can add more authentication-related functions here
};

export default authService;
