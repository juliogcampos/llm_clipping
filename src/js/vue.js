const { createApp } = Vue;

createApp({
    data() {
        return {
            news: [],
            searchTerm: '',
            selectedSource: ''
        };
    },

    computed: {

        filteredSources() {
            let sources = new Set();
            this.news.forEach(item => {
                if (item.source && item.source.trim() !== '') {
                    sources.add(item.source);
                }
            });

            sources = [...sources]
            return sources.sort();
        },

        filteredPosts() {
            const term = this.searchTerm.toLowerCase();

            return this.news.filter(item => {

                // is valid item
                if (!item.title || !item.source || !item.date || !item.summary || !item.url) {
                    return false;
                }

                // filter by source
                if (this.selectedSource && item.source !== this.selectedSource) {
                    return false;
                }

                // filter by term
                if (term) {
                    return (
                        item.title.toLowerCase().includes(term) ||
                        item.source.toLowerCase().includes(term) ||
                        item.summary.toLowerCase().includes(term)
                    );
                }

                return true;
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
        },

        selectSource(source) {
            this.selectedSource = source;
        },

        clearSource() {
            this.selectedSource = '';
        }

    },

    mounted() {

        this.loadNews();
    }

}).mount("#app");
