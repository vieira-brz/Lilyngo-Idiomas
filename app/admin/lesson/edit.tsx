import { SimpleForm, Edit, TextInput, required, ReferenceInput, NumberInput } from "react-admin";

export const LessonEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <TextInput source="title" validate={[required()]} label='Title' />
                <NumberInput source="order" validate={[required()]} label='Order' />
                <ReferenceInput source="unitId" reference="units" />
            </SimpleForm>
        </Edit>
    )
}