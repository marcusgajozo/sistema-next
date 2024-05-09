"use client";

import React, { useEffect, useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";

import useAuth from "@/shared/hooks/useAuth";
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";
export default function Login() {
  const { register, handleSubmit } = useForm({
    mode: "onBlur",
    // validar formulário
  });

  const { login, isAuthenticated } = useAuth();
  const [espera, setEspera] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      redirect("/painel-controle");
    } else {
      setEspera(true);
    }
  }, [isAuthenticated]);

  const handleSubmitData = (data: any) => {
    login(data);
  };

  return (
    <>
      {espera && (
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Entrar no sistema
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(handleSubmitData)}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                {...register("email")}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                {...register("password")}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Entrar
              </Button>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
}
