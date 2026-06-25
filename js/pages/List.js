import { fetchList, fetchEditors } from '../api.js';

export default {
    data() {
        return {
            list: [],
            editors: [],
            loading: true,
            selected: 0,
            errors: [],
            toggledShowcase: false
        };
    },
    computed: {
        level() {
            return (this.list && this.list[this.selected]) ? this.list[this.selected] : null;
        },
        video() {
            if (!this.level || !this.level.showcase) return null;
            return this.toggledShowcase
                ? this.level.showcase
                : this.level.verification;
        }
    },
    async mounted() {
        this.loading = true;
        try {
            this.list = await fetchList();
            this.editors = await fetchEditors();
        } catch (e) {
            console.error("List load failed:", e);
            this.errors = ["Failed to load list data."];
            this.list = [];
        } finally {
            this.loading = false;
        }
    }
};
