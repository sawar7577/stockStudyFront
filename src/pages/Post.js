import React, {useContext, useState} from 'react';
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    SimpleForm,
    TextInput,
    LongTextInput,
    Edit,
    DisabledInput,
    Create,
    DeleteButton
  } from 'react-admin';

  export const PostCreate = (props) => (
    <Create {...props}>
      <SimpleForm>
        <TextInput source='title' label='Title' />
        <LongTextInput source='body' label='Body' />
      </SimpleForm>
    </Create>
  )
  
  export const PostEdit = (props) => (
    <Edit title='Post Edit' {...props}>
      <SimpleForm>
        <DisabledInput label='id' source='id' />
        <TextInput source='title' label='Title' />
        <LongTextInput source='body' label='Body' />
      </SimpleForm>
    </Edit>
  )
  
  export const PostList = (props) => (
    <List {...props}>
      <Datagrid>
        <TextField source='id' />
        <TextField source='title' label='Title' />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  )