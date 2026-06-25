import { fetchList } from "../content.js";

export default {
    template: `
        <main class="page-list">
            <div class="list-container">
                <header class="page-header">
                    <h1>Time Machine</h1>
                    <div class="date-picker">
                        <input type="date" v-model="selectedDate" @change="loadDate">
                    </div>
                </header>

                <table class="list">
                    <tr v-for="([level, err], i) in list" :key="i">
                        <td class="rank">
                            <p class="type-label-lg">#{{ i + 1 }}</p>
                        </td>
                        <td class="level">
                            <span class="type-label-lg">{{ level?.name || 'Error loading level' }}</span>
                        </td>
                    </tr>
                </table>
            </div>
        </main>
    `,
    data: () => ({
        list: [],
        selectedDate: new Date().toISOString().split('T')[0],
    }),
    async mounted() {
        // Just load the current data to start
        await this.loadDate();
    },
    methods: {
        async loadDate() {
            // Note: This calls fetchList(). 
            // If fetchList() doesn't support dates yet, we are not breaking it.
            this.list = await fetchList();
        }
    }
};
