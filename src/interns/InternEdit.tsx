import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  ReferenceInput,
  required,
  useRecordContext,
} from "react-admin";

const departmentChoices = [
  { id: "Informatique", name: "Informatique" },
  { id: "Marketing", name: "Marketing" },
  { id: "RH", name: "RH" },
  { id: "Finance", name: "Finance" },
];

export const InternTitle = () => {
  const record = useRecordContext();
  return record ? (
    <span>
      Modifier le stagiaire : {record.firstname} {record.lastname}
    </span>
  ) : null;
};

export const InternEdit = () => (
  <Edit title={<InternTitle />} redirect="list">
    <SimpleForm>
      <TextInput source="firstname" label="Prénom" validate={[required()]} />
      <TextInput source="lastname" label="Nom" validate={[required()]} />
      <TextInput source="email" label="Email" validate={[required()]} />
      <SelectInput
        source="department"
        label="Département"
        choices={departmentChoices}
        validate={[required()]}
      />
      <ReferenceInput
        source="managerId"
        reference="employees"
        filter={{ active: true }}
      >
        <SelectInput
          label="Manager"
          optionText={(record) =>
            record ? `${record.firstname} ${record.lastname}` : ""
          }
          validate={[required()]}
        />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
