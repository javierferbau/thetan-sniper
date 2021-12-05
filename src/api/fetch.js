export const fetchDatas = async (...args) => {
    const res = await fetch(...args);
    return await res.json();
  }