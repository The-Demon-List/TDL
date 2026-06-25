import { fetchList } from "../content.js";

export default {
    template: `
        <main class="page-list">
            <div class="list-container">
                <header class="time-machine-header">
                    <h1>Time Machine</h1>
                    <div class="date-picker">
                        <label>View list as of: </label>
                        <input type="date" v-model="selectedDate" @change="loadDate">
                    </div>
                </header>
                
                <table class="list" v-if="list.length > 0">
                    <tr v-for="([level, err], i) in list" :key="i">
                        <td class="rank">
                            <p class="type-label-lg">#{{ i + 1 }}</p>
                        </td>
                        <td class="level">
                            <span class="type-label-lg">{{ level?.name || 'Error loading level' }}</span>
                        </td>
                    </tr>
                </table>
                <div v-else class="empty-state">
                    <p>No snapshot found for this date. Select a different date.</p>
                </div>
            </div>
            <div class="level-container"></div>
            <div class="meta-container"></div>
        </main>
    `,
    data: () => ({
        list: [],
        selectedDate: new Date().toISOString().split('T')[0],
    }),
    async mounted() {
        await this.loadDate();
    },
    methods: {
        async loadDate() {
            this.list = await fetchList(this.selectedDate);
        }
    }
};
