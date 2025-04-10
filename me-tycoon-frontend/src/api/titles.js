import axios from './axiosConfig';

export const getUserTitles = async () => {
    const res = await axios.get('/user-titles/');
    return res.data;
};

export const equipTitle = async (id) => {
    const res = await axios.post(`/user-titles/${id}/equip/`);
    return res.data;
};

export const unequipTitle = async (id) => {
    const res = await axios.post(`/user-titles/${id}/unequip/`);
    return res.data;
};