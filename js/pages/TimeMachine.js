import { fetchList } from "../content.js";

export default {
    template: `
  <main class="page-list timemachine-layout">
    <div class="list-container" style="width: 100%;">
      <header class="page-header">
        <h1>Time Machine</h1>
        <div class="date-picker">
          <input type="date" v-model="selectedDate" @change="loadDate">
        </div>
      </header>

      <table class="list" style="width: 100%;">
        <tr v-for="([level, err], i) in list" :key="i">
          <td>
            <span class="type-label-lg">{{ level?.name || 'Error loading level' }}</span>
          </td>
        </tr>
      </table>
    </div>
  </main>
`,
    data: () => ({
        list: [],
        allData: [], // This stores your master list
        selectedDate: new Date().toISOString().split('T')[0],
    }),
    async mounted() {
        // Fetch the data ONCE when the component starts
        this.allData = await fetchList();
        // Run the filter immediately
        this.loadDate();
    },
    methods: {
        loadDate() {
            // Filter the 'allData' master list and save the result to 'list'
            this.list = this.allData.filter(([level, err]) => {
                // Ensure 'level.date' exists in your data
                return level.date === this.selectedDate;
            });
        }
    }
};
