import { fetchList, setGitRevision } from '../content.js';
import { embed } from '../util.js';

export default {
    template: `
        <main v-if="loading" class="list-container">
            <div style="text-align: center; padding: 50px; color: #fff; font-family: 'Lexend Deca';">Loading Timeline Snapshots...</div>
        </main>
        <main v-else class="page-history" style="font-family: 'Lexend Deca', sans-serif; padding: 20px; max-width: 1200px; margin: 0 auto;">
            <div style="background: #202225; padding: 25px; border-radius: 8px; margin-bottom: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <h1 style="margin: 0 0 10px 0; color: #fff;">🕰️ Demon List Time Machine</h1>
                <p style="color: #b9bbbe; margin-bottom: 20px;">Travel back in time to look at snapshots of what the Demon List used to look like based on past updates.</p>
                
                <div style="display: flex; gap: 15px; align-items: center; flex-wrap: wrap;">
                    <label style="font-weight: bold; color: #b9bbbe;">Select a Snapshot:</label>
                    <select @change="travelToCommit($event.target.value)" style="background: #2f3136; color: #fff; border: 1px solid #4f545c; padding: 10px 15px; border-radius: 5px; font-family: 'Lexend Deca'; cursor: pointer; min-width: 280px;">
                        <option value="live">Present Day (Live List)</option>
                        <option v-for="commit in pastCommits" :key="commit.sha" :value="commit.sha">
                            {{ formatDate(commit.date) }} — {{ commit.message }}
                        </option>
                    </select>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 20px;" class="history-layout">
                <div style="background: #202225; border-radius: 8px; padding: 15px; max-height: 75vh; overflow-y: auto;">
                    <h3 style="color: #b9bbbe; border-bottom: 1px solid #4f545c; padding-bottom: 10px; margin-top: 0;">Rankings</h3>
                    <ol style="list-style: none; padding: 0; margin: 0;">
                        <li v-for="(level, index) in list" :key="index" @click="selected = index" :style="{ background: selected === index ? '#eb455f' : 'transparent', color: '#fff', padding: '10px', borderRadius: '4px', cursor: 'pointer', marginBottom: '5px' }">
                            <span>#{{ index + 1 }} {{ level.name }}</span>
                        </li>
                    </ol>
                </div>

                <div v-if="list[selected]" style="background: #202225; border-radius: 8px; padding: 25px;">
                    <h2 style="font-size: 2.5rem; margin-top: 0; color: #fff;">{{ list[selected].name }}</h2>
                    <p style="color: #b9bbbe;">Creator: <strong style="color: #fff;">{{ list[selected].creator }}</strong></p>
                    <p style="color: #b9bbbe;">Verifier: <strong style="color: #fff;">{{ list[selected].verifier }}</strong></p>
                    
                    <div v-if="embed(list[selected].verification)" style="margin: 20px 0; aspect-ratio: 16/9;">
                        <iframe style="width: 100%; height: 100%; border-radius: 8px;" :src="'https://www.youtube.com/embed/' + embed(list[selected].verification)" frameborder="0" allowfullscreen></iframe>
                    </div>

                    <h3 style="color: #fff; margin-top: 30px; border-bottom: 1px solid #4f545c; padding-bottom: 5px;">Historical Records</h3>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 10px; color: #fff;">
                        <thead>
                            <tr style="text-align: left; border-bottom: 2px solid #4f545c; color: #b9bbbe;">
                                <th style="padding: 10px 5px;">User</th>
                                <th>Progress</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="record in list[selected].records" style="border-bottom: 1px solid #2f3136;">
                                <td style="padding: 10px 5px;">{{ record.user }}</td>
                                <td style="font-weight: bold; color: #2ecc71;">{{ record.percent }}%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    `,
    data: () => ({
        list: [],
        pastCommits: [],
        selected: 0,
        loading: true,
    }),
    async mounted() {
        try {
            this.list = await fetchList() || [];
        } catch (e) {
            console.error(e);
        }
        
        try {
            const res = await fetch('https://api.github.com/repos/ZeroLoki500/The-Demon-List/commits?path=data');
            const commits = await res.json();
            if (Array.isArray(commits)) {
                this.pastCommits = commits.map(c => ({
                    sha: c.sha,
                    date: c.commit.committer.date,
                    message: c.commit.message.length > 50 ? c.commit.message.substring(0, 50) + '...' : c.commit.message
                }));
            }
        } catch(e) {
            console.error("Failed to sync historical snapshots", e);
        }
        this.loading = false;
    },
    methods: {
        embed,
        formatDate(dateStr) {
            const d = new Date(dateStr);
            return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
        },
        async travelToCommit(sha) {
            this.loading = true;
            if (sha === 'live') {
                setGitRevision(null);
            } else {
                setGitRevision(sha);
            }
            try {
                this.list = await fetchList() || [];
            } catch (e) {
                console.error(e);
            }
            this.selected = 0;
            this.loading = false;
        }
    }
};
