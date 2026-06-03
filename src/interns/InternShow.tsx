import {
  Show,
  SimpleShowLayout,
  TextField,
  ReferenceField,
  FunctionField,
  TopToolbar,
  ListButton,
  EditButton,
} from "react-admin";

const InternShowActions = () => (
  <TopToolbar>
    <ListButton />
    <EditButton />
  </TopToolbar>
);

export const InternShow = () => (
  <Show actions={<InternShowActions />}>
    <SimpleShowLayout>
      <TextField source="id" label="ID" />
      <TextField source="firstname" label="Prénom" />
      <TextField source="lastname" label="Nom" />
      <TextField source="email" label="Email" />
      <TextField source="department" label="Département" />
      <ReferenceField source="managerId" reference="employees" label="Manager">
        <FunctionField
          render={(record) =>
            record ? `${record.firstname} ${record.lastname}` : ""
          }
        />
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);
