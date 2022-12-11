import axios from "axios";
import { NEWS_ITEM_URL, NEWS_SEARCH_URL } from "./urls";

const fetch = id => axios.get(`${NEWS_ITEM_URL}${id}`);

const search = params => axios.get(NEWS_SEARCH_URL, { params });

const newsApi = {
  fetch,
  search,
};

export default newsApi;