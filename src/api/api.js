import AxiosInstance from '../auth/axiosInstance';

const TEAM = '/api/v1/protected/teams';
export const createTeam = async team => AxiosInstance.post(TEAM, team);
export const getTeam = async id => AxiosInstance.get(`${TEAM}/${id}`);
export const getAllTeams = async () => AxiosInstance.get(`${TEAM}`);

// Example:
const GET_FOO = '/api/v1/protected/foo';
export const getFoo = () => AxiosInstance.get(GET_FOO);
