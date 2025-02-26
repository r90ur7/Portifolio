// setupGithubApi.ts
import axios from "axios";

export function setupGithubApi(githubToken: string, githubUsername: string, githubList: string) {
    const api = axios.create({
        baseURL: "https://api.github.com",
        headers: {
            "Content-Type": "application/json",
        },
    });

    // Se houver um token definido, configura o header de Authorization
    // if (githubToken) {
    //     api.defaults.headers.common["Authorization"] = `Bearer ${githubToken}`;
    // }

    return { api, githubUsername, githubList };
}

export default setupGithubApi;