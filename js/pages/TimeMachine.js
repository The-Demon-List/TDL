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
    loadDate() {
        // ADD THIS LINE TO SEE YOUR DATA IN THE CONSOLE
        console.log("First item sample:", this.allData[0]); 

        this.list = this.allData.filter(([level, err]) => {
            // Check what 'level' actually contains
            console.log("Level object:", level);
            
            // IF THIS IS UNDEFINED, CHANGE 'level.date' BELOW
            return level.date === this.selectedDate; 
        });
    }
}
};
