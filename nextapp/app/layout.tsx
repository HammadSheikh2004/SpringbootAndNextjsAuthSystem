"use client"
import "./globals.css";
import SessionInitializer from "./hooks/SessionInitializer";
import { Provider } from "react-redux";
import { store } from "./redux/store";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="en">
      <body className="min-h-full flex flex-col">
        <Provider store={store}>
          <SessionInitializer>
            {children}
          </SessionInitializer>
        </Provider>
      </body>
    </html>
  );
}
