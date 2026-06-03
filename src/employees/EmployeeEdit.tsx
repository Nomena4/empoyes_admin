import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  NumberInput,
  BooleanInput,
  required,
  minValue,
  useRecordContext,
} from "react-admin";

const departmentChoices = [
  { id: "Informatique", name: "Informatique" },
  { id: "Marketing", name: "Marketing" },
  { id: "RH", name: "RH" },
  { id: "Finance", name: "Finance" },
];

export const EmployeeTitle = () => {
  const record = useRecordContext();
  return record ? (
    <span>
      Modifier : {record.firstname} {record.lastname}
    </span>
  ) : null;
};

interface EmployeeRecord {
  id?: string;
  active?: boolean;
}

const validateEmployeeDeactivation = async (values: EmployeeRecord) => {
  const errors: Record<string, string> = {};
  if (values.active === false && values.id) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_JSON_SERVER_URL || "http://localhost:3002"}/interns?managerId=${values.id}`,
      );
      const interns = await response.json();
      if (Array.isArray(interns) && interns.length > 0) {
        errors.active =
          "Cet employé est le manager de stagiaires actifs et ne peut pas être désactivé.";
      }
    } catch (e) {
      console.error("Erreur lors de la validation des stagiaires", e);
    }
  }
  return errors;
};

export const EmployeeEdit = () => (
  <Edit title={<EmployeeTitle />} redirect="list">
    <SimpleForm validate={validateEmployeeDeactivation}>
      <TextInput source="firstname" label="Prénom" validate={[required()]} />
      <TextInput source="lastname" label="Nom" validate={[required()]} />
      <TextInput source="email" label="Email" validate={[required()]} />
      <SelectInput
        source="department"
        label="Département"
        choices={departmentChoices}
        validate={[required()]}
      />
      <NumberInput
        source="salary"
        label="Salaire"
        validate={[required(), minValue(1500)]}
      />
      <BooleanInput source="active" label="Actif" />
    </SimpleForm>
  </Edit>
);
