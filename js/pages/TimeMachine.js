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
        <tr v-if="noDataFound">
    <td colspan="2" style="text-align: center;">No changes found for this date.</td>
</tr>
<tr v-else v-for="([level, err], i) in list" :key="i">
    </tr>
    </div>
  </main>
`,
    data: () => ({
        list: [],
        allData: [], // This stores your master list
        selectedDate: new Date().toISOString().split('T')[0],
    }),
    async mounted() {
    this.allData = await fetchList();
    
    // ADD THIS LINE
    console.log("DEBUG: The full data from fetchList is:", this.allData);

    // If the data exists, print the first item to see its structure
    if (this.allData.length > 0) {
        console.log("DEBUG: The first item structure is:", this.allData[0]);
    } else {
        console.warn("WARNING: The data list is empty!");
    }
    
    this.loadDate();
},
    methods: {
    async loadDate() {
        // 1. Fetch data
        const data = await fetchList(this.selectedDate);
        
        // 2. Check if data returned anything
        if (data && data.length > 0) {
            this.list = data;
            this.noDataFound = false; // Add this to your data()
        } else {
            this.list = [];
            this.noDataFound = true; // Add this to your data()
        }
    }
}
};
