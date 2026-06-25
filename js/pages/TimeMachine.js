import { fetchList } from "../content.js";

export default {
    data() {
    return {
        selectedDate: new Date().toISOString().split('T')[0], // Defaults to today
        fullList: [ /* ... your original data here ... */ ]
    }
},
computed: {
    // This creates a "filtered" version of your list
    filteredList() {
        if (!this.selectedDate) return this.fullList;
        return this.fullList.filter(item => item.date === this.selectedDate);
    }
}
    template: `
  <main class="page-list timemachine-layout">
    <div class="list-container" style="width: 100%;">
      <header class="page-header">
        <h1>Time Machine</h1>
        <div class="date-picker">
          <input type="date" v-model="selectedDate" @change="filterByDate">
        </div>
      </header>

      <table class="list" style="width: 100%;">
        <tr v-for="([level, err], i) in filteredList" :key="i">
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
        selectedDate: new Date().toISOString().split('T')[0],
    }),
    computed: {
    filteredList() {
        // If no date is selected, show everything
        if (!this.selectedDate) return this.list;
        
        // Otherwise, filter the list by the date
        // (Make sure your data objects have a 'date' property)
        return this.list.filter(item => {
             // Assuming your item structure is [level, err]
             // Adjust 'level.date' to whatever property holds your date
             return level.date === this.selectedDate;
        });
    }
},
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
