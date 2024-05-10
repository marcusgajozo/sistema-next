"use client";

import { useEffect, useState } from "react";

import DataTable from "@/shared/components/DataTable";
import FormCustom from "@/shared/components/FormCustom";
import apiConfig from "@/shared/services/api/api-config";

type Product = {
  name: string;
  description: string;
  saleValue: number;
  linkDownload: string;
  sizes: string;
  productsAssociates: string[];
};

const headerTableName: any = {
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
  const [dataProductId, setDataProductId] = useState({});

  useEffect(() => {
    apiConfig
      .get("/product")
      .then((res) => {
        if (res?.status === 200) {
          setProducts(res?.data);
        }
      })
      .catch((e) => console.log(e?.message));
  }, [openForm]);

  const handleForm = () => {
    setEditProductForm(false);
    setOpenForm(!openForm);
  };

  const registerProduct = (data: any) => {
    const { saleValue } = data;
    apiConfig
      .post("/product", { ...data, saleValue: Number(saleValue) })
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
    const { saleValue } = data;
    apiConfig
      .put(`/product/${data?.id}`, { ...data, saleValue: Number(saleValue) })
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

  return (
    <>
      {openForm && (
        <FormCustom
          title="Produto"
          fieldName={headerTableName}
          viewForm={handleForm}
          editItemForm={editProductForm}
          saveEditItem={saveEditProduct}
          registerItem={registerProduct}
          itemId={dataProductId}
        />
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
