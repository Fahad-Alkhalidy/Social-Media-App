import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import useCreateComment from "../../hooks/useCreateComment";
import { IComment } from "../../Typescript Types/commentTypes";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface CreateCommentProps {
  postId: string;
}

export default function CreateComment({ postId }: CreateCommentProps) {
  console.log(postId);
  const [open, setOpen] = React.useState(false);
  const { loading, error, createNewComment } = useCreateComment();

  // Corrected state structure
  const [commentContent, setCommentContent] = React.useState<IComment>({
    postId,
    content: "",
  });

  const handleCreateComment = () => {
    if (!commentContent.content.trim()) return; // Prevent empty comments

    createNewComment(commentContent); // Use existing state

    // Reset input and close modal
    setCommentContent({ postId, content: "" });
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentContent((prev) => ({
      ...prev,
      content: e.target.value, // Only update content, not postId
    }));
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Create A Comment
      </Button>
      <BootstrapDialog
        onClose={() => setOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Create Comment
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={{ position: "absolute", right: 8, top: 8, color: "grey" }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <input
            type="text"
            placeholder="Enter Content"
            onChange={handleChange}
            value={commentContent.content}
            name="content"
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCreateComment} disabled={loading}>
            {loading ? "Saving..." : "Save changes"}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
