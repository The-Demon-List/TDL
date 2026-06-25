import { fetchList } from "../content.js";
import Spinner from "../components/Spinner.js";

export default {
    components: { Spinner },
    template: `
        <main v-if="loading">
            <Spinner></Spinner>
        </main>
        <main v-else class="page-list">
            <h1>Time Machine</h1>
            <div class="time-machine" style="padding: 20px;">
                <label>View list as of: </label>
                <input type="date" v-model="selectedDate" @change="loadDate">
            </div>
            
            <div class="list-container">
                <table class="list" v-if="list.length > 0">
                    <tr v-for="([level, err], i) in list">
                        <td class="rank">
                            <p v-if="i + 1 <= 75" class="type-label-lg">#{{ i + 1 }}</p>
                            <p v-else class="type-label-lg">Legacy</p>
                        </td>
                        <td class="level">
                            <span class="type-label-lg">{{ level?.name || \`Error (\${err}.json)\` }}</span>
                        </td>
                    </tr>
                </table>
                <p v-else style="padding: 20px;">No data found for this date.</p>
            </div>
        </main>
    `,
    data: () => ({
        list: [],
        loading: false,
        selectedDate: new Date().toISOString().split('T')[0],
    }),
    methods: {
        async loadDate() {
            this.loading = true;
            // You will need to ensure your content.js/server supports a date query
            this.list = await fetchList(this.selectedDate); 
            this.loading = false;
        }
    },
    async mounted() {
        await this.loadDate();
    }
};
