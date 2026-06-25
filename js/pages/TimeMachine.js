import { fetchList } from "../content.js";
import Spinner from "../components/Spinner.js";

export default {
    components: { Spinner },
    template: `
        <main class="page-list">
            <div class="list-container">
                <h1>Time Machine</h1>
                <div style="padding: 20px;">
                    <label>View list as of: </label>
                    <input type="date" v-model="selectedDate" @change="loadDate">
                </div>
                <table class="list" v-if="list && list.length > 0">
                    <tr v-for="([level, err], i) in list">
                        <td class="rank">
                            <p v-if="i + 1 <= 75" class="type-label-lg">#{{ i + 1 }}</p>
                            <p v-else class="type-label-lg">Legacy</p>
                        </td>
                        <td class="level">
                            <span class="type-label-lg">{{ level?.name || 'Error' }}</span>
                        </td>
                    </tr>
                </table>
                <p v-else style="padding: 20px;">No data found for this date.</p>
            </div>
            <div class="level-container"></div>
            <div class="meta-container"></div>
        </main>
    `,
    data: () => ({
        list: [],
        loading: true,
        selectedDate: new Date().toISOString().split('T')[0],
    }),
    methods: {
        async loadDate() {
            this.loading = true;
            // This expects your fetchList in content.js to handle the date
            this.list = await fetchList(this.selectedDate);
            this.loading = false;
        }
    },
    async mounted() {
        await this.loadDate();
    }
};
