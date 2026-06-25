import { fetchList } from "../content.js";

// This injects the styling automatically so you don't need a separate CSS file
const styleId = 'time-machine-styles';
if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
        .page-list { padding: 80px 20px 20px 20px; width: 100%; box-sizing: border-box; }
        .page-header { width: 100%; border-bottom: 1px solid #444; padding-bottom: 20px; margin-bottom: 20px; }
        .list { width: 100%; border-collapse: collapse; color: white; }
        .list td { padding: 15px; border-bottom: 1px solid #444; text-align: left; }
        .date-picker { margin-top: 10px; }
        .date-picker input { background: #222; color: white; border: 1px solid #555; padding: 10px; border-radius: 5px; }
        .empty-state { color: #888; padding-top: 20px; }
    `;
    document.head.appendChild(style);
}

export default {
    template: `
        <main class="page-list">
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
                <p>No snapshot found for this date. Select a different date.</p>
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
