import { round, score } from './score.js';

/**
 * Path to directory containing `_list.json` and all levels
 */
const dir = '/data';

export async function fetchList() {
    const listResult = await fetch(`${dir}/_list.json`);
    const list = await listResult.json();
    return await Promise.all(
        list.map(async (path) => {
            const levelResult = await fetch(`${dir}/${path}.json`);
            const level = await levelResult.json();
            return {
                ...level,
                path,
                records: level.records.sort((a, b) => b.percent - a.percent),
            };
        }),
    );
    try {
        const list = await listResult.json();
        return await Promise.all(
            list.map(async (path, rank) => {
                const levelResult = await fetch(`${dir}/${path}.json`);
                try {
                    const level = await levelResult.json();
                    return [
                        {
                            ...level,
                            path,
                            records: level.records.sort(
                                (a, b) => b.percent - a.percent,
                            ),
                        },
                        null,
                    ];
                } catch {
                    console.error(`Failed to load level #${rank + 1} ${path}.`);
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
    const editorsResults = await fetch(`${dir}/_editors.json`);
    const editors = await editorsResults.json();
    return editors;
    try {
        const editorsResults = await fetch(`${dir}/_editors.json`);
        const editors = await editorsResults.json();
        return editors;
    } catch {
        return null;
    }
}

export async function fetchLeaderboard() {
    const list = await fetchList();

    const scoreMap = {};
    list.forEach((level, rank) => {
    const errs = [];
    list.forEach(([level, err], rank) => {
        if (err) {
            errs.push(err);
            return;
        }

        // Verification
        const verifier = Object.keys(scoreMap).find(
            (u) => u.toLowerCase() === level.verifier.toLowerCase(),
@@ -95,5 +120,5 @@
    });

    // Sort by total score
    return res.sort((a, b) => b.total - a.total);
    return [res.sort((a, b) => b.total - a.total), errs];
}
