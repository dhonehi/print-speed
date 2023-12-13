import { forismaticClient } from "@/helpers/axios/axios-clients";

export default {
    async getQuote(lang) {
        const response = await forismaticClient.get('', {
            params: {
                method: 'getQuote',
                format: 'json',
                lang
            }
        })

        return response.data
    }
}