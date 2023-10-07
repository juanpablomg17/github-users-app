import axios from "axios";
import { QueryFunctionContext, useQuery } from "react-query";
import { UsersFilters, UsersDto } from "../interfaces/user/user";
import { config } from '../config/config';


async function fetchGithubUsers(ctx: QueryFunctionContext<[string, UsersFilters]>) {
    const [, filters] = ctx.queryKey;

    if (Object.values(filters || {}).every(filterValue => !filterValue)) {
        return {
            incomplete_results: false,
            items: [],
            total_count: 0
        } as UsersDto;
    }

    const options = {
        method: 'GET',
        url: `${config.gituhubApiUrl}/search/users?q=${filters.name}&per_page=10`,
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const { data } = await axios.request<UsersDto>(options);
    return data;
}

export default function useGithubUsers(filters: UsersFilters) {
    const hasAnyFilter = Object.values(filters || {}).some(filterValue => filterValue);
    return useQuery(['githubUsers', filters], fetchGithubUsers, {
        enabled: hasAnyFilter,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        refetchInterval: false,
    });
}