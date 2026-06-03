import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  FunctionField,
  SearchInput,
  SelectInput,
  EditButton,
  DeleteButton,
} from "react-admin";

const internFilters = [
  <SearchInput source="q" alwaysOn />,
  <SelectInput
    source="department"
    label="Département"
    choices={[
      { id: "Informatique", name: "Informatique" },
      { id: "Marketing", name: "Marketing" },
      { id: "RH", name: "RH" },
      { id: "Finance", name: "Finance" },
    ]}
  />,
];

export const InternList = () => (
  <List filters={internFilters} perPage={5}>
    <Datagrid rowClick="show">
      <TextField source="firstname" label="Prénom" />
      <TextField source="lastname" label="Nom" />
      <TextField source="email" label="Email" />
      <TextField source="department" label="Département" />
      <ReferenceField source="managerId" reference="employees" label="Manager">
        <FunctionField render={(record) => record ? `${record.firstname} ${record.lastname}` : ""} />
      </ReferenceField>
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
