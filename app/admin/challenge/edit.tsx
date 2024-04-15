import { SimpleForm, Edit, TextInput, required, ReferenceInput, NumberInput, SelectInput } from "react-admin";

export const ChallengeEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <TextInput source="question" validate={[required()]} label='Question' />
                <SelectInput source="type" validate={[required()]} choices={[
                    {
                        id: "SELECT",
                        name: "SELECT"
                    },
                    {
                        id: "ASSIST",
                        name: "ASSIST"
                    }
                ]} />
                <NumberInput source="order" validate={[required()]} label='Order' />
                <ReferenceInput source="lessonId" reference="lessons" />
            </SimpleForm>
        </Edit>
    )
}