import { fetchHistoricalList } from "../content.js";

export default {
    template: `
        <div style="max-width: 900px; margin: 100px auto 50px auto; padding: 20px; color: #fff; font-family: sans-serif;">
            <div style="background: #1a1a1a; padding: 30px; border-radius: 12px; border: 1px solid #333; margin-bottom: 20px;">
                <h1 style="margin: 0 0 15px 0;">Archive Console</h1>
                <p style="color: #aaa; margin-bottom: 20px;">Browse the list history by selecting a date below.</p>
                <input type="date" v-model="selectedDate" @change="loadDate" style="background: #333; color: white; border: 1px solid #555; padding: 12px; border-radius: 8px; width: 100%; max-width: 300px; cursor: pointer;">
            </div>

            <div style="background: #1a1a1a; padding: 20px; border-radius: 12px; border: 1px solid #333;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr v-for="([level, err], i) in list" :key="i" style="border-bottom: 1px solid #333;">
                        <td style="padding: 15px 10px; color: #666; width: 50px;">#{{ i + 1 }}</td>
                        <td style="padding: 15px 10px; font-weight: bold;">{{ level?.name || 'Unknown Level' }}</td>
                    </tr>
                </table>
                
                <div v-if="list.length === 0" style="text-align: center; padding: 40px; color: #666;">
                    No snapshot data available for this date.
                </div>
            </div>
        </div>
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
            this.list = await fetchHistoricalList(this.selectedDate);
        }
    }
};
