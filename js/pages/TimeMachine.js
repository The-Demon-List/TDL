import { fetchList } from "../content.js";
import Spinner from "../components/Spinner.js";

export default {
    components: { Spinner },
    template: `
        <main class="page-list">
            <div class="list-container">
                <h1>Time Machine</h1>
                <p style="padding: 20px;">This page is currently a placeholder.</p>
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
            <div class="level-container"></div>
            <div class="meta-container"></div>
        </main>
    `,
    data: () => ({
        list: [],
        loading: true,
    }),
    async mounted() {
        // Just load the normal list so the layout works
        this.list = await fetchList();
        this.loading = false;
    }
};
