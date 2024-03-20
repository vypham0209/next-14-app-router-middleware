'use client';
//RELATIVE MODULES
import OrderContextProvider from './context/OrderContext';

export default function Layout({ children }: any) {
  return <OrderContextProvider>{children}</OrderContextProvider>;
}
