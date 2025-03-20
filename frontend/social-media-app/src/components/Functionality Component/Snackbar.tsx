import * as React from "react";
import Box from "@mui/material/Box";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";

interface State extends SnackbarOrigin {
  open: boolean;
}

export default function PositionedSnackbar({ user }) {
  const [error, setError] = React.useState<string | null>(null);
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState: SnackbarOrigin) => {
    setState({ ...newState, open: true });
  };

  const handleFollow = async (userId: string) => {
    try {
      const response = await fetch("/api/v1/friendReqs/createAFriendRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: localStorage.getItem("id"),
          receiver: userId,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log(result);
        setError(null); // Reset error if request is successful
      } else {
        setError("You have already sent a friend request!");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      handleClick({ vertical: "top", horizontal: "center" });
    }
  };

  const handleClose = () => {
    setState((prevState) => ({ ...prevState, open: false }));
  };

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
      <button className="btn btn-primary" onClick={() => handleFollow(user)}>
        Follow
      </button>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={
          error
            ? "You have already sent a friend request to this user"
            : "Friend request sent successfully!"
        }
        key={vertical + horizontal}
      />
    </Box>
  );
}
