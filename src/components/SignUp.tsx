import { Box, Button, TextField, Typography } from "@mui/material";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

type SignUpProps = {
  handleClose: () => void;
};

const SignUp = ({ handleClose }: SignUpProps) => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setIsRegistered(true);
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (isRegistered) {
    return (
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: 400,
          margin: "0 auto",
        }}
      >
        <Typography sx={{ fontSize: "17px" }}>
          ユーザー登録が完了しました。
        </Typography>
        <Button variant="contained" fullWidth onClick={handleClose}>
          閉じる
        </Button>
      </Box>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        maxWidth: 400,
        margin: "0 auto",
      }}
    >
      <Typography sx={{ fontSize: "17px" }}>ユーザー登録</Typography>
      <TextField
        label="メールアドレス"
        variant="outlined"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        label="パスワード"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <Button type="submit" variant="contained" fullWidth>
        登録
      </Button>
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
};

export default SignUp;
