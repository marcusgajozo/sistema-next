import { Grid, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import ButtonCustom from "../ButtonCustom";

type FormCustomProps = {
  componentCustom?: React.ReactNode;
  title: string;
  fieldName: any;
  viewForm: () => void;
  editItemForm: boolean;
  saveEditItem: (data: any) => void;
  registerItem: (data: any) => void;
  itemId: any;
};

const FormCustom = ({
  componentCustom,
  title,
  fieldName,
  viewForm,
  editItemForm,
  saveEditItem,
  registerItem,
  itemId,
}: FormCustomProps) => {
  const { register, handleSubmit, reset } = useForm({
    mode: "onBlur",
  });

  useEffect(() => {
    if (editItemForm) {
      reset(itemId);
    }
    reset({});
  }, [editItemForm, itemId, reset]);

  const key = Object.keys(fieldName);
  return (
    <Grid
      container
      sx={{
        flexDirection: "column",
        maxWidth: 600,
      }}
    >
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        {editItemForm ? "Editar " : "Cadastrar "}
        {title}
      </Typography>
      <Grid item sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {componentCustom}
        {key.map((name: any, index) => {
          return (
            <TextField
              key={index}
              {...register(name)}
              label={fieldName[name]}
              variant="standard"
            />
          );
        })}
      </Grid>
      <Grid
        item
        sx={{
          marginTop: 3,
          display: "flex",
          justifyContent: "right",
          gap: 1,
        }}
      >
        <ButtonCustom title="Cancelar" functionCustom={viewForm} />
        <ButtonCustom
          title="Salvar"
          functionCustom={handleSubmit(
            editItemForm ? saveEditItem : registerItem
          )}
        />
      </Grid>
    </Grid>
  );
};

export default FormCustom;
