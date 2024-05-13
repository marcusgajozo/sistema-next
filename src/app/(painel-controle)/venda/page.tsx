"use client";

import { useEffect, useState } from "react";

import DataTable from "@/shared/components/DataTable";
import FormCustom from "@/shared/components/FormCustom";
import apiConfig from "@/shared/services/api/api-config";

const headerTableName: any = {
  description: "Descrição",
  totalValue: "Valor total",
  clientId: "Cliente ID",
  transactions: "Transações",
};

type DataProps = {
  description: string;
  clientId: string;
  items: string;
};

const fieldName: any = {
  description: "Descrição",
  clientId: "Cliente ID",
  items: "Itens",
};

export default function Venda() {
  const [sales, setSales] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [editSaleForm, setEditSaleForm] = useState(false);
  const [dataSaleId, setDataSaleId] = useState({});

  useEffect(() => {
    apiConfig
      .get("/sale")
      .then((res) => {
        if (res?.status === 200) {
          setSales(res?.data);
        }
      })
      .catch((e) => console.log(e?.message));
  }, [openForm]);

  const handleForm = () => {
    setEditSaleForm(false);
    setOpenForm(!openForm);
  };

  const registersale = (data: DataProps) => {
    const { items } = data;
    const lisItems: string[] = items.split(/\s|,/);
    apiConfig
      .post("/sale", { ...data, items: lisItems })
      .then((res) => {
        if (res?.status === 201) {
          handleForm();
        }
      })
      .catch((e) => console.log(e));
  };

  const editSale = (id: string) => {
    apiConfig.get(`/sale/${id}`).then((res) => {
      if (res?.status === 200) {
        setDataSaleId(res?.data);
        setEditSaleForm(true);
        setOpenForm(!openForm);
      }
    });
  };

  const saveEditSale = (data: any) => {
    apiConfig.put(`/sale/${data?.id}`, { ...data }).then((res) => {
      if (res?.status === 200) {
        setEditSaleForm(false);
        handleForm();
      }
    });
  };

  const removeSale = (id: string) => {
    apiConfig
      .delete(`/sale/${id}`)
      .then((res) => {
        apiConfig.get("/sale").then((res) => {
          if (res?.status === 200) {
            setSales(res?.data);
          }
        });
      })
      .catch((e) => console.log(e?.message));
  };

  return (
    <>
      {openForm && (
        <FormCustom
          title="Venda"
          fieldName={fieldName}
          viewForm={handleForm}
          editItemForm={editSaleForm}
          saveEditItem={saveEditSale}
          registerItem={registersale}
          itemId={dataSaleId}
        />
      )}
      {!openForm && (
        <DataTable
          title={"Vendas"}
          rows={sales}
          nameTitleRows={headerTableName}
          openForm={handleForm}
          removeItem={removeSale}
          editItem={editSale}
          disableEditing
        />
      )}
    </>
  );
}
