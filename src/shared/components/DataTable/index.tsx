import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ButtonCustom from "../ButtonCustom";

type DataTableProps = {
  title: string;
  rows: any;
  nameTitleRows: any;
  openForm: () => void;
  removeItem: (id: string) => void;
  editItem: (id: string) => void;
  disableEditing?: boolean;
};

export default function DataTable({
  title,
  rows,
  nameTitleRows,
  openForm,
  removeItem,
  editItem,
  disableEditing,
}: DataTableProps) {
  const keys = Object.keys(nameTitleRows);
  return (
    <TableContainer component={Paper}>
      <Grid
        sx={{ margin: 1, display: "flex", justifyContent: "space-between" }}
      >
        <Typography variant="h6">{title}</Typography>
        <ButtonCustom title="Adicionar +" functionCustom={openForm} />
      </Grid>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {keys?.map((name: any, index: any) => {
              return <TableCell key={index}>{nameTitleRows[name]}</TableCell>;
            })}
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row: any) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {keys.map((name: any, index: any) => {
                return <TableCell key={index}>{row[name]}</TableCell>;
              })}
              <TableCell>
                <Box sx={{ gap: 1, display: "flex" }}>
                  {!disableEditing && (
                    <Tooltip title="Editar" arrow>
                      <IconButton onClick={() => editItem(row.id)}>
                        <ModeEditIcon sx={{ color: "#283044" }} />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title="Deletar" arrow>
                    <IconButton onClick={() => removeItem(row.id)}>
                      <DeleteIcon
                        sx={{ color: "#ff6663", cursor: "pointer" }}
                      />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
