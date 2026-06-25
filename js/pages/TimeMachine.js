import { fetchList } from "../content.js";

export default {
    template: `
        <main class="page-list">
            <div class="list-container">
                <header class="page-header">
                    <h1>Time Machine</h1>
                    <div class="date-picker">
                        <label>View list as of: </label>
                        <input type="date" v-model="selectedDate" @change="loadDate">
                    </div>
                </header>

                <table class="list" v-if="list.length > 0">
                    <tr v-for="([level, err], i) in list" :key="i">
                        <td class="rank">#{{ i + 1 }}</td>
                        <td class="level">{{ level?.name || 'Error loading level' }}</td>
                    </tr>
                </table>

                <div v-else class="empty-state">
                    <p style="padding: 20px;">No snapshot found for this date. Check if the folder exists in your /data directory.</p>
                </div>
            </div>
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
