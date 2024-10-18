"use client";
import { HTMLAttributes, useContext } from "react";
import { TransactionContext } from "./Transaction";

interface TransactionButtonProps extends HTMLAttributes<HTMLButtonElement> {}

export function TransactionButton(props: TransactionButtonProps) {
  const { progress, reset, state } = useContext(TransactionContext);

  return <button onClick={progress} {...props} />;
}
