import React, { useState } from "react";

import { isEmpty } from "ramda";
import { purple } from '@mui/material/colors';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { Button, Typography, Avatar, Box } from "@mui/material";

import { capitalize, formatDate } from "../../utils";

const Comment = ({ comment }) => {
  const [openReplies, setOpenReplies] = useState(false);

  const replyCount = comment.children?.length;

  const handleReplyClick = () => setOpenReplies(prevState => !prevState);

  if (!comment.author || !comment.text) return null;

  return (
    <div className="border-t p-4">
      <Box className="flex items-center justify-between space-x-2">
        <Box className="flex items-center space-x-2">
          <Avatar sx={{ bgcolor: purple[500], fontSize: 12, width: 24, height: 24 }} aria-label="recipe">
            {capitalize(comment.author)?.charAt(0)}
          </Avatar>
          <Typography variant="h6">{capitalize(comment.author)}</Typography>
        </Box>
        <Typography variant="body2">{formatDate(comment.created_at)}</Typography>
      </Box>
      <Box className="py-2">
        <p id="comment-box" className="all-initial" dangerouslySetInnerHTML={{ __html: comment.text }} />
      </Box>
      {
        !isEmpty(comment.children) && (
          <>
            <Button
              onClick={handleReplyClick}
              endIcon={openReplies ? <ExpandLess /> : <ExpandMore />}
            >
              View {replyCount} {replyCount > 1 ? "replies" : "reply"}
            </Button>
            {
              openReplies && comment.children?.map(item => <Comment comment={item} />)
            }
          </>
        )
      }
    </div>
  );
};

export default Comment;