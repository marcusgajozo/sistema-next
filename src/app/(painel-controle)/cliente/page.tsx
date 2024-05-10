"use client";

import { useEffect, useState } from "react";

import DataTable from "@/shared/components/DataTable";
import FormCustom from "@/shared/components/FormCustom";
import apiConfig from "@/shared/services/api/api-config";

const headerTableName: any = {
  name: "Nome",
  email: "Email",
  cpf: "CPF",
};

const fieldName = headerTableName;

export default function Cliente() {
  const [clients, setClients] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [editClientForm, setEditClientForm] = useState(false);
  const [dataClientId, setDataClientId] = useState({});

  useEffect(() => {
    apiConfig
      .get("/client")
      .then((res) => {
        if (res?.status === 200) {
          setClients(res?.data);
        }
      })
      .catch((e) => console.log(e?.message));
  }, [openForm]);

  const handleForm = () => {
    setEditClientForm(false);
    setOpenForm(!openForm);
  };

  const registerClient = (data: any) => {
    apiConfig
      .post("/client", { ...data })
      .then((res) => {
        if (res?.status === 201) {
          handleForm();
        }
      })
      .catch((e) => console.log(e));
  };

  const editClient = (id: string) => {
    apiConfig.get(`/client/${id}`).then((res) => {
      if (res?.status === 200) {
        setDataClientId(res?.data);
        setEditClientForm(true);
        setOpenForm(!openForm);
      }
    });
  };

  const saveEditClient = (data: any) => {
    apiConfig.put(`/client/${data?.id}`, { ...data }).then((res) => {
      if (res?.status === 200) {
        setEditClientForm(false);
        handleForm();
      }
      console.log(res);
    });
  };

  const removeClient = (id: string) => {
    apiConfig
      .delete(`/client/${id}`)
      .then((res) => {
        console.log(res?.status === 200);
        apiConfig.get("/client").then((res) => {
          if (res?.status === 200) {
            setClients(res?.data);
          }
        });
      })
      .catch((e) => console.log(e?.message));
  };

  return (
    <>
      {openForm && (
        <FormCustom
          title="Clientes"
          fieldName={fieldName}
          viewForm={handleForm}
          editItemForm={editClientForm}
          saveEditItem={saveEditClient}
          registerItem={registerClient}
          itemId={dataClientId}
        />
      )}
      {!openForm && (
        <DataTable
          title={"Cliente"}
          rows={clients}
          nameTitleRows={headerTableName}
          openForm={handleForm}
          removeItem={removeClient}
          editItem={editClient}
          disableEditing
        />
      )}
    </>
  );
}
