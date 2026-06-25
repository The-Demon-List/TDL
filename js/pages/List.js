// 1. IMPORTANT: Ensure these imports are at the very top of your file.
// If you don't import them, you will get a ReferenceError.
import { fetchList, fetchEditors } from '../api.js'; // Adjust path if needed

export default {
    data() {
        return {
            list: [],
            editors: [],
            loading: true,
            selected: 0,
            errors: []
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
            // This now matches the structure expected by your app
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
