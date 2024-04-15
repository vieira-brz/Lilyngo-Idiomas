import { SimpleForm, Edit, TextInput, required, NumberInput, ReferenceInput } from "react-admin";

export const UnitEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <NumberInput source="id" validate={[required()]} label='Id' />
                <TextInput source="title" validate={[required()]} label='Title' />
                <TextInput source="description" validate={[required()]} label='Description' />
                <NumberInput source="order" validate={[required()]} label='Order' />
                <ReferenceInput source="courseId" reference="courses" />
            </SimpleForm>
        </Edit>
    )
}