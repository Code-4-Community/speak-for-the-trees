import AxiosInstance from '../auth/axiosInstance';

const TEAM = '/api/v1/protected/teams';
export const createTeam = async team => AxiosInstance.post(TEAM, team);
export const joinTeam = async id => AxiosInstance.post(`${TEAM}/${id}/join`);
export const leaveTeam = async id => AxiosInstance.post(`${TEAM}/${id}/leave`);
export const kickMember = async (team, member) => AxiosInstance.post(`${TEAM}/${team}/members/${member}/kick`);
export const disbandTeam = async id => AxiosInstance.post(`${TEAM}/${id}/disband`);
export const getTeam = async id => AxiosInstance.get(`${TEAM}/${id}`);
export const getAllTeams = async () => AxiosInstance.get(`${TEAM}`);

const BLOCKS_LEADERBOARD = '/api/v1/blocks/leaderboard';
export const getBlocksLeaderboard = async () => AxiosInstance.get(BLOCKS_LEADERBOARD);

const USER_DATA = '/api/v1/protected/user/data';
export const getUserData = async () => AxiosInstance.get(USER_DATA);

// Example:
const GET_FOO = '/api/v1/protected/foo';
export const getFoo = () => AxiosInstance.get(GET_FOO);
