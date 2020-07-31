import AxiosInstance from '../auth/axiosInstance';

const TEAM = '/api/v1/protected/teams';
export const createTeam = async team => AxiosInstance.post(TEAM, team);
export const applyTeam = async id => AxiosInstance.post(`${TEAM}/${id}/apply`);
export const leaveTeam = async id => AxiosInstance.post(`${TEAM}/${id}/leave`);
export const kickMember = async (id, member) => AxiosInstance.post(`${TEAM}/${id}/members/${member}/kick`);
export const transferOwnership = async (id, member) => AxiosInstance.post(`${TEAM}/${id}/transfer_ownership`, member);
export const approveApplicant = async (team, member) => AxiosInstance.post(`${TEAM}/${team}/applicants/${member}/approve`);
export const rejectApplicant = async (team, member) => AxiosInstance.post(`${TEAM}/${team}/applicants/${member}/reject`);
export const disbandTeam = async id => AxiosInstance.post(`${TEAM}/${id}/disband`);
export const getTeam = async id => AxiosInstance.get(`${TEAM}/${id}`);
export const getApplicants = async id => AxiosInstance.get(`${TEAM}/${id}/applicants`);
export const getAllTeams = async () => AxiosInstance.get(`${TEAM}`);
export const getAllTeamsAdmin = async () => AxiosInstance.get(`${TEAM}/admin`);
export const getTeamsCSV = async () => AxiosInstance.get(`${TEAM}/export`);

const BLOCKS_RESERVATION = '/api/v1/protected/blocks';
export const reserveBlocks = async blocks => AxiosInstance.post(`${BLOCKS_RESERVATION}/reserve`, blocks);
export const finishBlocks = async blocks => AxiosInstance.post(`${BLOCKS_RESERVATION}/finish`, blocks);
export const releaseBlocks = async blocks => AxiosInstance.post(`${BLOCKS_RESERVATION}/release`, blocks);
export const resetBlocks = async blocks => AxiosInstance.post(`${BLOCKS_RESERVATION}/reset`, blocks);
export const getReservedBlocks = async () => AxiosInstance.get(`${BLOCKS_RESERVATION}/reserved`);
export const getBlocksCSV = async () => AxiosInstance.get(`${BLOCKS_RESERVATION}/export`);
export const getReservedBlocksAdmin = async () => AxiosInstance.get(`${BLOCKS_RESERVATION}/reserved/admin`);
export const getCompletedBlocksAdmin = async () => AxiosInstance.get(`${BLOCKS_RESERVATION}/done/admin`);

const BLOCKS_LEADERBOARD = '/api/v1/blocks/leaderboard';
export const getBlocksLeaderboard = async () => AxiosInstance.get(BLOCKS_LEADERBOARD);

const PROTECTED_USER = '/api/v1/protected/user';
export const getUserData = async () => AxiosInstance.get(`${PROTECTED_USER}/data`);
export const changePassword = async passwords => AxiosInstance.post(`${PROTECTED_USER}/change_password`, passwords);
export const changeEmail = async data => AxiosInstance.post(`${PROTECTED_USER}/change_email`, data);
export const changeUsername = async data => AxiosInstance.post(`${PROTECTED_USER}/change_username`, data);
export const deleteUser = async () => AxiosInstance.delete(`${PROTECTED_USER}`);

export const forgotPassword = async email => AxiosInstance.post('/api/v1/user/forgot_password/request/', email);
