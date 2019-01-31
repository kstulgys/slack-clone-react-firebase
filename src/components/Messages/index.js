import React from 'react';
import MessagesHeader from './MessagesHeader';
import MessagesWindow from './MessagesWindow';
import MessagesForm from './MessagesForm';

export default function Messages() {
  return (
    <>
      <MessagesHeader />
      <MessagesWindow />
      <MessagesForm />
    </>
  );
}
