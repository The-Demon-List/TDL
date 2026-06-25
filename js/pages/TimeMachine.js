template: `
        <main class="page-list">
            <div class="list-container">
                <h1>Time Machine</h1>
                <div style="padding: 20px;">
                    <label>View list as of: </label>
                    <input type="date" v-model="selectedDate" @change="loadDate">
                </div>
                <table class="list" v-if="list.length > 0">
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
            </div>
            <div class="level-container">
                <!-- Empty container to satisfy the CSS layout -->
            </div>
        </main>
    `,
