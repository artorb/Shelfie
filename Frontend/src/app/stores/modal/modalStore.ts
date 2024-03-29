import { makeAutoObservable } from "mobx";
import { MutableRefObject } from "react";

interface Modal {
  open: boolean;
  body: JSX.Element | null;
  title?: string;
  focus?: MutableRefObject<any>;
}

export class ModalStore {
  modal: Modal = {
    open: false,
    body: null,
    title: "",
    focus: null,
  };

  constructor() {
    makeAutoObservable(this);
  }

  openModal = (
    content: JSX.Element,
    title: string = "",
    focus: MutableRefObject<any> = null
  ) => {
    this.modal.open = true;
    this.modal.body = content;
    this.modal.title = title;
    this.modal.focus = focus;
  };

  closeModal = () => {
    this.modal.open = false;
    this.modal.body = null;
  };

  sleep = (delay: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  };
}
