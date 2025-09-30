const { createApp } = Vue;

createApp({
    data() {
        return {
            news: [],
            searchTerm: ''
        };
    },

    computed: {
        filteredPosts() {
            const term = this.searchTerm.toLowerCase();
            if (!term) return this.news;

            return this.news.filter(article => {
                return (
                    article.title.toLowerCase().includes(term) ||
                    article.source.toLowerCase().includes(term) ||
                    article.summary.toLowerCase().includes(term)
                );
            });
        }
    },

    methods: {

        async loadNews() {
            try {
                const res = await fetch("src/data/data.json");
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                this.news = data;

            } catch (err) {
                console.error("Error to load JSON:", err);
            }
        }
    },

    mounted() {

        this.loadNews();
    }

}).mount("#app");
