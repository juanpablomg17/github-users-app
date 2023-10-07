import axios from "axios";
import { QueryFunctionContext, useQuery } from "react-query";
import { UserProfileDto, GetUserProfileDto } from "../interfaces/user/user";
import { config } from '../config/config';


async function fetchGithubUsersProfiles(ctx: QueryFunctionContext<[string, GetUserProfileDto]>): Promise<UserProfileDto> {
    const [, filters] = ctx.queryKey;

    if (Object.values(filters || {}).every(filterValue => !filterValue)) {
        return { } as UserProfileDto;
    }

    const options = {
        method: 'GET',
        url: `${config.gituhubApiUrl}/users/${filters.userName}`,
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const { data } = await axios.request<UserProfileDto>(options);
    return data;
}

export default function useGithubUserProfiles(filters: GetUserProfileDto) {
    const hasAnyFilter = Object.values(filters || {}).some(filterValue => filterValue);
    return useQuery(['githubUsersProfile', filters], fetchGithubUsersProfiles, {
        enabled: hasAnyFilter,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        refetchInterval: false,
    });
}