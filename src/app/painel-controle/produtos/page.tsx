"use client";

import { useEffect, useState } from "react";

import { apiConfig } from "@/shared/services/api/api-config";
import DataTable from "@/shared/components/DataTable";

export type TokenTypesConfig = {
  [key in keyof typeof TokenTypes]: ITokenConfig;
};

export default function DataTableProdutos() {
  const [products, setProducts] = useState(null);
  const [headerTable, setHeaderTable] = useState(null);
  useEffect(() => {
    apiConfig()
      .get("/product")
      .then((res) => {
        if (res?.status === 200) {
          setProducts(res?.data);
          setHeaderTable();
        }
      })
      .catch((e) => console.log(e?.message));
  }, []);
  return (
    <>
      <DataTable title={"Produtos"} rows={products!} headCells={headerTable} />
    </>
  );
}
