import React, { useEffect, useState } from "react";

import { useDebounce } from 'usehooks-ts';
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { ToastContainer, toast } from "react-toastify";
import { TextField, InputAdornment } from "@mui/material";

import newsApi from "../apis/news";
import { COLUMNS } from "./constants";

const Dashboard = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [dataCount, setDataCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const debouncedQuery = useDebounce(query, 500);

  const fetchData = async (showLoding = false) => {
    showLoding && setLoading(true);
    try {
      const { data: {
        hits: news,
        nbHits: count
      } } = await newsApi.search({ query: debouncedQuery, page: pageNumber });
      setData(news);
      setDataCount(count);
    } catch (error) {
      toast(error);
    } finally {
      showLoding && setLoading(false);
    }
  };

  const handleRowClick = params => navigate(`/${params.id}`);
  const handlePageChange = newPage => setPageNumber(newPage);

  useEffect(() => {
    fetchData(true);
  }, []);

  useEffect(() => {
    fetchData();
  }, [pageNumber, debouncedQuery]);

  return (
    <div className={`p-20 bg-gray-100 ${loading ? "h-screen" : ""}`}>
      <ToastContainer />
      <div className="flex flex-col justify-center items-center">
        <TextField
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-xl"
          id="search"
          name="search"
          label="Search"
        />
      </div>
      {
        loading ? <h1>Loding...</h1> : (
          <DataGrid
            autoHeight
            rows={data}
            pageSize={20}
            columns={COLUMNS}
            rowCount={dataCount}
            paginationMode="server"
            hideFooterRowCount={false}
            rowsPerPageOptions={[20]}
            onRowClick={handleRowClick}
            className="bg-white mt-10"
            getRowId={(row) => row.objectID}
            getRowClassName={() => "cursor-pointer"}
            onPageChange={newPage => handlePageChange(newPage)}
          />
        )
      }
    </div>
  );
};

export default Dashboard;
