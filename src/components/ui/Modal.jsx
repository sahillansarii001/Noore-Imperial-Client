'use client';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Fragment } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Modal({ isOpen, onClose, title, children, className }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className={cn(
                "w-full max-w-md transform overflow-hidden bg-[#0A0A0A] border border-gold/50 p-6 text-left align-middle shadow-xl transition-all",
                className
              )}>
                <div className="flex justify-between items-center mb-6">
                  {title && (
                    <DialogTitle as="h3" className="text-2xl font-cormorant text-gold">
                      {title}
                    </DialogTitle>
                  )}
                  <button
                    onClick={onClose}
                    className="text-grey hover:text-gold transition-colors focus:outline-none"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
