import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { purple } from '@mui/material/colors';
import {
  Button,
  Typography,
  Box,
  Card,
  CardHeader,
  CardContent,
  Collapse,
  Avatar,
  CardActions
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

import newsApi from "../../apis/news";
import { capitalize, formatDate } from "../../utils";

import Loader from "../Loader";
import Comment from "./Comment";

const NewsDetails = () => {
  const { id } = useParams();
  const [expanded, setExpanded] = React.useState(true);
  const [newsDetails, setNewsDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleExpandClick = () => setExpanded(prevState => !prevState);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await newsApi.fetch(id);
      setNewsDetails(data);
    } catch (error) {
      toast(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loader />
  };

  return (
    <Card className="max-w-3xl mx-auto my-10">
      <Box className="flex items-center justify-between">
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: purple[500] }} aria-label="recipe">
              {capitalize(newsDetails.author)?.charAt(0)}
            </Avatar>
          }
          title={capitalize(newsDetails.author)}
          subheader={formatDate(newsDetails.created_at)}
        />
        <Typography className="px-4" variant="h5">{newsDetails.points}</Typography>
      </Box>
      <CardContent className="">
        <Typography variant="h3">{newsDetails.title}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          onClick={handleExpandClick}
          endIcon={expanded ? <ExpandLess /> : <ExpandMore />}
        >
          View comments
        </Button>
      </CardActions>
      <Collapse in={expanded} timeout="500">
        <Box>
          {
            newsDetails.children?.map(item => (
              <Comment comment={item} />
            ))
          }
        </Box>
      </Collapse>
    </Card>
  );
};

export default NewsDetails;