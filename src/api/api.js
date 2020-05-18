import AxiosInstance from '../auth/axiosInstance';

const CREATE_TEAM = '/api/v1/protected/teams';
export const createTeam = async team => AxiosInstance.post(CREATE_TEAM, team);

const GET_TEAM = '/api/v1/protected/teams/';
export const getTeam = async id => AxiosInstance.get(`${GET_TEAM}${id}`);

// Example:
const GET_FOO = '/api/v1/protected/foo';
export const getFoo = () => AxiosInstance.get(GET_FOO);
