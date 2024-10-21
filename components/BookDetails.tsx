import { Fragment } from "react";
import Image from "next/image";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { BookCardProps } from "@types";

interface BookDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  book: BookCardProps;
}

const BookDetails = ({ isOpen, closeModal, book }: BookDetailsProps) => (
  <>
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-out duration-300"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
                <button
                  type="button"
                  className="absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full"
                  onClick={closeModal}
                >
                  <Image
                    src="/close.svg"
                    alt="close"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </button>

                <div className="flex-1 flex flex-col gap-3">
                  <div className="relative w-full h-40 bg-pattern bg-cover bg-center rounded-lg">
                    <img
                      src="/placeholder-image.svg"
                      alt="book cover"
                      className="object-contain w-full h-full"
                    />
                  </div>

                  <div className="flex-1 flex flex-col gap-2">
                    <h2 className="font-semibold text-xl capitalize">{book.title}</h2>
                    <p className="text-sm text-gray-600">Grade: {book.grade}</p>
                    <p className="text-sm text-gray-600">Category: {book.category}</p>

                    <div className="mt-3">
                      <h4 className="font-bold">Description</h4>
                      <p className="text-black-100">{book.description}</p>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  </>
);

export default BookDetails;
