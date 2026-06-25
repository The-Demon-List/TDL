export default {
    components: {
        Spinner: () => import('../components/Spinner.js'),
        LevelAuthors: () => import('../components/LevelAuthors.js'),
    },
    template: `
        <main>
            <div v-if="loading" class="loader-container">
                <Spinner />
            </div>
            <div v-else>
                <div v-if="errors.length" class="error-container">
                    <p v-for="err in errors">{{ err }}</p>
                </div>
                <div v-else class="list-container">
                    <table>
                        <tr v-for="(item, i) in list" :key="i">
                            <td>
                                <button 
                                    class="type-label-lg" 
                                    :class="{ 'active': selected == i }" 
                                    @click="selected = i"
                                >
                                    {{ item.name }}
                                </button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </main>
    `,
    data() {
        return {
            list: [],
            editors: [],
            loading: true,
            selected: 0,
            errors: [],
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
