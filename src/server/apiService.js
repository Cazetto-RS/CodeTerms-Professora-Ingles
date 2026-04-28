import api from "./api.js";

export const TermsService = {
    getTerms : async () => {
        try {
            const response = await api.get('/terms');
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar termos:", error);
            throw error;
        }
    },

    getTermsByID : async (id) => {
        try {
            const response = await api.get(`/terms/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao buscar termos com o ID ${id}:`, error);
            throw error;
        }
    },

    searchTerms: async (query) => {
        const response = await api.get(`/terms/search?q=${query}`);
        return response.data;
    }
}