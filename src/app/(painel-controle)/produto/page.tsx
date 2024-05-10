"use client";

import { useEffect, useState } from "react";

import DataTable from "@/shared/components/DataTable";
import FormCustom from "@/shared/components/FormCustom";
import apiConfig from "@/shared/services/api/api-config";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

type Product = {
  name: string;
  description: string;
  saleValue: number;
  linkDownload: string;
  sizes: string;
  productsAssociates: string[];
};

const fieldNameProductSimple: any = {
  name: "Nome",
  description: "Descrição",
  saleValue: "Preço",
};

const fieldNameProductDigital: any = {
  name: "Nome",
  description: "Descrição",
  saleValue: "Preço",
  linkDownload: "Link de Download",
};

const fieldNameProductConfigurable: any = {
  name: "Nome",
  description: "Descrição",
  saleValue: "Preço",
  sizes: "Tamanhos",
};

const fieldNameProductGrouped: any = {
  name: "Nome",
  description: "Descrição",
  saleValue: "Preço",
  productsAssociates: "Produtos associados",
};

const headerTableName: any = {
  ...fieldNameProductSimple,
  ...fieldNameProductDigital,
  ...fieldNameProductConfigurable,
  ...fieldNameProductGrouped,
};

const selectProduct: any = {
  productSimple: fieldNameProductSimple,
  productDigital: fieldNameProductDigital,
  productConfigurable: fieldNameProductConfigurable,
  productGrouped: fieldNameProductGrouped,
};

export default function Produto() {
  const [products, setProducts] = useState<Product | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [editProductForm, setEditProductForm] = useState(false);
  const [dataProductId, setDataProductId] = useState({});
  const [select, setSelect] = useState("productSimple");

  useEffect(() => {
    apiConfig
      .get("/product")
      .then((res) => {
        if (res?.status === 200) {
          console.log(res?.data);
          setProducts(res?.data);
        }
      })
      .catch((e) => console.log(e?.message));
  }, [openForm]);

  const handleForm = () => {
    setEditProductForm(false);
    setOpenForm(!openForm);
  };

  const registerProductSimple = (data: any) => {
    console.log("entrei simples");
    const { saleValue } = data;
    apiConfig
      .post("/product/simple", { ...data, saleValue: Number(saleValue) })
      .then((res) => {
        if (res?.status === 201) {
          handleForm();
        }
      })
      .catch((e) => console.log(e));
  };

  const registerProductDigital = (data: any) => {
    console.log("entrei digital");
    const { saleValue } = data;
    apiConfig
      .post("/product/digital", { ...data, saleValue: Number(saleValue) })
      .then((res) => {
        if (res?.status === 201) {
          handleForm();
        }
      })
      .catch((e) => console.log(e));
  };

  const registerProductConfigurable = (data: any) => {
    console.log("entrei config");
    const { sizes, saleValue } = data;
    const lisSizes: string[] = sizes
      ? sizes.split(/\s|,/).filter((size: any) => size.trim() !== "")
      : [];
    apiConfig
      .post("/product/configurable", {
        ...data,
        saleValue: Number(saleValue),
        sizes: lisSizes,
      })
      .then((res) => {
        if (res?.status === 201) {
          handleForm();
        }
      })
      .catch((e) => console.log(e));
  };

  const registerProductGrouped = (data: any) => {
    console.log("entrei grouped");
    const { productsAssociates, saleValue } = data;
    const lisProductsAssociates: string[] = productsAssociates
      ? productsAssociates
          .split(/\s|,/)
          .filter((productsAssociates: any) => productsAssociates.trim() !== "")
      : [];
    apiConfig
      .post("/product/grouped", {
        ...data,
        saleValue: Number(saleValue),
        productsAssociates: lisProductsAssociates,
      })
      .then((res) => {
        if (res?.status === 201) {
          handleForm();
        }
      })
      .catch((e) => console.log(e));
  };

  const editProduct = (id: string) => {
    apiConfig.get(`/product/${id}`).then((res) => {
      if (res?.status === 200) {
        setDataProductId(res?.data);
        setEditProductForm(true);
        setOpenForm(!openForm);
      }
    });
  };

  const saveEditProduct = (data: any) => {
    const { saleValue, sizes } = data;
    const lisSizes: string[] = sizes
      ? sizes.split(/\s|,/).filter((size: any) => size.trim() !== "")
      : [];
    apiConfig
      .put(`/product/${data?.id}`, {
        ...data,
        saleValue: Number(saleValue),
        sizes: lisSizes,
      })
      .then((res) => {
        if (res?.status === 200) {
          setEditProductForm(false);
          handleForm();
        }
        console.log(res);
      });
  };

  const removeProduct = (id: string) => {
    apiConfig
      .delete(`/product/${id}`)
      .then((res) => {
        console.log(res?.status === 200);
        apiConfig.get("/product").then((res) => {
          if (res?.status === 200) {
            setProducts(res?.data);
          }
        });
      })
      .catch((e) => console.log(e?.message));
  };

  const selectRegisterProduct: any = {
    productSimple: registerProductSimple,
    productDigital: registerProductDigital,
    productConfigurable: registerProductConfigurable,
    productGrouped: registerProductGrouped,
  };

  return (
    <>
      {openForm && (
        <>
          <FormCustom
            componentCustom={
              !editProductForm && (
                <>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Tipo de produto
                    </InputLabel>
                    <Select
                      value={select}
                      label="Tipo de produto"
                      onChange={(e: SelectChangeEvent) =>
                        setSelect(e.target.value)
                      }
                    >
                      <MenuItem value={"productSimple"}>Simples</MenuItem>
                      <MenuItem value={"productDigital"}>Digital</MenuItem>
                      <MenuItem value={"productConfigurable"}>
                        Configurável
                      </MenuItem>
                      <MenuItem value={"productGrouped"}>Agrupado</MenuItem>
                    </Select>
                  </FormControl>
                </>
              )
            }
            title="Produto"
            fieldName={
              editProductForm ? headerTableName : selectProduct[select]
            }
            viewForm={handleForm}
            editItemForm={editProductForm}
            saveEditItem={saveEditProduct}
            registerItem={selectRegisterProduct[select]}
            itemId={dataProductId}
          />
        </>
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
