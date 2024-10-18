import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/v1/members';

export const getMemberByEmail = async (email: string) => {
  const result = await axios.get(baseUrl + '?email=' + email);
  return result.data;
};

export const createMember = async (memberCreateRequest: MemberCreateRequest) => {
  const result = await axios.post(baseUrl, memberCreateRequest);
  return result.data;
};

export const getTasksByMemberId = async (id: string) => {
  const result = await axios.get(baseUrl + `/${id}/tasks`);
  return result.data;
};
