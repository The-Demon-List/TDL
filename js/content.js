import { round, score } from './score.js';

let currentGitRevision = null;

export function setGitRevision(sha) {
    currentGitRevision = sha;
}

function getFetchUrl(path) {
    if (currentGitRevision) {
        return `https://raw.githubusercontent.com/ZeroLoki500/TDL/${currentGitRevision}/${path}`;
    }
    return `/${path}`;
}

export async function fetchList() {
    try {
        const listResult = await fetch(getFetchUrl('data/_list.json'));
        const list = await listResult.json();
        
        return await Promise.all(
            list.map(async (path, rank) => {
                try {
                    const levelResult = await fetch(getFetchUrl(`data/${path}.json`));
                    const level = await levelResult.json();
                    return {
                        ...level,
                        path,
                        records: (level.records || []).sort(
                            (a, b) => b.percent - a.percent,
                        ),
                    };
                } catch {
                    console.error(`Failed to load level #${rank + 1} ${path}.`);
                    // Returns the exact error layout format List.js needs on line 168
                    return [null, path];
                }
            }),
        );
    } catch {
        console.error(`Failed to load list.`);
        return null;
    }
}

export async function fetchEditors() {
    try {
        const editorsResults = await fetch('/data/_editors.json');
        const editors = await editorsResults.json();
        return editors;
    } catch {
        return null;
    }
}

export async function fetchLeaderboard() {
    const list = await fetchList();
    const scoreMap = {};
    const errs = [];
    
    if (list && Array.isArray(list)) {
        list.forEach((level, rank) => {
            if (!level || Array.isArray(level)) return;

            // Verification
            const verifier = Object.keys(scoreMap).find(
                (u) => u.toLowerCase() === level.verifier.toLowerCase(),
            ) || level.verifier;
            scoreMap[verifier] ??= {
                verified: [],
                completed: [],
                progressed: [],
            };
            const { verified } = scoreMap[verifier];
            verified.push({
                rank: rank + 1,
                level: level.name,
                score: score(rank + 1, 100, level.percentToQualify),
                link: level.verification,
            });

            // Records
            if (level.records && Array.isArray(level.records)) {
                level.records.forEach((record) => {
                    const user = Object.keys(scoreMap).find(
                        (u) => u.toLowerCase() === record.user.toLowerCase(),
                    ) || record.user;
                    scoreMap[user] ??= {
                        verified: [],
                        completed: [],
                        progressed: [],
                    };
                    const { completed, progressed } = scoreMap[user];
                    if (record.percent === 100) {
                        completed.push({
                            rank: rank + 1,
                            level: level.name,
                            score: score(rank + 1, 100, level.percentToQualify),
                            link: record.link,
                        });
                        return;
                    }

                    progressed.push({
                        rank: rank + 1,
                        level: level.name,
                        percent: record.percent,
                        score: score(rank + 1, record.percent, level.percentToQualify),
                        link: record.link,
                    });
                });
            }
        });
    }

    const res = Object.entries(scoreMap).map(([user, scores]) => {
        const { verified, completed, progressed } = scores;
        const total = [verified, completed, progressed]
            .flat()
            .reduce((prev, cur) => prev + cur.score, 0);

        return {
            user,
            total: round(total),
            ...scores,
        };
    });

    return [res.sort((a, b) => b.total - a.total), errs];
}
