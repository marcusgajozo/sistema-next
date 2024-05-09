"use client";

import { useEffect, useState } from "react";

import ButtonCustom from "@/shared/components/ButtonCustom";
import DataTable from "@/shared/components/DataTable";
import { apiConfig } from "@/shared/services/api/api-config";
import { Grid, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

type Product = {};

const headerTableName = {
  name: "Nome",
  description: "Descrição",
  saleValue: "Preço",
  linkDownload: "Link de Download",
  sizes: "Tamannhos",
  productsAssociates: "Produtos associados",
};

export default function Produto() {
  const [products, setProducts] = useState<Product | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [editProductForm, setEditProductForm] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    mode: "onBlur",
    // validar formulário
  });

  useEffect(() => {
    apiConfig()
      .get("/product")
      .then((res) => {
        if (res?.status === 200) {
          setProducts(res?.data);
        }
      })
      .catch((e) => console.log(e?.message));
  }, [openForm]);

  const handleForm = () => {
    reset({});
    setOpenForm(!openForm);
  };

  const registerProduct = (data: any) => {
    const { saleValue } = data;
    apiConfig()
      .post("/product", { ...data, saleValue: Number(saleValue) })
      .then((res) => {
        if (res?.status === 201) {
          handleForm();
        }
      })
      .catch((e) => console.log(e));
  };

  const editProduct = (id: string) => {
    apiConfig()
      .get(`/product/${id}`)
      .then((res) => {
        if (res?.status === 200) {
          reset(res?.data);
          setEditProductForm(!editProduct);
          setOpenForm(!openForm);
        }
      });
  };

  const saveEditProduct = (data: any) => {
    const { saleValue } = data;
    apiConfig()
      .put(`/product/${data?.id}`, { ...data, saleValue: Number(saleValue) })
      .then((res) => {
        if (res?.status === 200) {
          setEditProductForm(!editProduct);
          handleForm();
        }
        console.log(res);
      });
  };

  const removeProduct = (id: string) => {
    apiConfig()
      .delete(`/product/${id}`)
      .then((res) => {
        console.log(res?.status === 200);
        apiConfig()
          .get("/product")
          .then((res) => {
            if (res?.status === 200) {
              setProducts(res?.data);
            }
          });
      })
      .catch((e) => console.log(e?.message));
  };

  return (
    <>
      {openForm && (
        <Grid
          container
          sx={{
            flexDirection: "column",
            maxWidth: 600,
          }}
        >
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            {editProductForm ? "Editar produto" : "Cadastrar produto"}
          </Typography>
          <Grid item sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField {...register("name")} label="Nome" variant="standard" />
            <TextField
              {...register("description")}
              label="Descrição"
              variant="standard"
            />
            <TextField
              type="number"
              {...register("saleValue")}
              label="Preço"
              variant="standard"
            />
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
            <ButtonCustom title="Cancelar" functionCustom={handleForm} />
            <ButtonCustom
              title="Salvar"
              functionCustom={handleSubmit(
                editProductForm ? saveEditProduct : registerProduct
              )}
            />
          </Grid>
        </Grid>
      )}
      {!openForm && (
        <DataTable
          title={"Produtos"}
          rows={products!}
          nameTitleRows={headerTableName}
          openForm={handleForm}
          removeItem={removeProduct}
          editItem={editProduct}
        />
      )}
    </>
  );
}
