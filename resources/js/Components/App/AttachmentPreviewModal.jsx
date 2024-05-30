import { isAudio, isImage, isPDF, isPreviewable, isVideo } from "@/helpers";
import { Dialog, Transition } from "@headlessui/react";
import { ChevronLeftIcon, ChevronRightIcon, PaperClipIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Fragment, useEffect, useMemo, useState } from "react";

const AttachmentPreviewModal = ({ attachments, index, show=false, onClose=() => {} }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const previewableAttachmets = useMemo(() => {
        return attachments.filter((attachment) => isPreviewable(attachment));
    }, [attachments]);
    
    const attachmet = useMemo(() => {
        return previewableAttachmets[currentIndex];
    }, [attachments, currentIndex]);

    const close = () => {
        onClose();
    };

    const prev = () => {
        if(currentIndex === 0) {
            return;
        }

        setCurrentIndex(currentIndex - 1);
    };

    const next = () => {
        if(currentIndex === previewableAttachmets.length - 1) {
            return;
        }

        setCurrentIndex(currentIndex + 1);
    };

    useEffect(() => {
        setCurrentIndex(index);
    }, [index]);

    return (
        <Transition show={show} as={Fragment} leave="duration-200">
            <Dialog as="div" id="modal" className="relative z-50" onClose={close}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="h-screen w-screen">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="flex flex-col w-full h-full transform overflow-hidden bg-slate-800 text-left align-middle shadow-xl transition-all">
                                <button
                                    onClick={close}
                                    className="absolute right-3 top-3 w-10 h-10 rounded-full hover:bg-black/10 transition flex items-center justify-center text-gray-100 z-40"
                                >
                                    <XMarkIcon className="w-6 h-6" />
                                </button>
                                <div className="relative group h-full">
                                    {currentIndex > 0 && (
                                        <button
                                            onClick={prev}
                                            className="absolute opacity-100 text-gray-100 cursor-pointer flex items-center justify-center w-16 h-16 left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 z-30"
                                        >
                                            <ChevronLeftIcon className="w-12" />
                                        </button>
                                    )}
                                    {currentIndex < previewableAttachmets.length - 1 && (
                                        <button
                                            onClick={next}
                                            className="absolute opacity-100 text-gray-100 cursor-pointer flex items-center justify-center w-16 h-16 right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 z-30"
                                        >
                                            <ChevronRightIcon className="w-12" />
                                        </button>
                                    )}
                                    {attachmet && (
                                        <div className="flex items-center justify-center w-full h-full p-3">
                                            {isImage(attachmet) && (
                                                <img src={attachmet.url} className="max-w-full max-h-full" />
                                            )}
                                            {isVideo(attachmet) && (
                                                <div className="flex item-center">
                                                    <video src={attachmet.url} controls autoPlay></video>
                                                </div>
                                            )}
                                            {isAudio(attachmet) && (
                                                <div className="relative flex justify-center items-center">
                                                    <audio src={attachmet.url} controls autoPlay></audio>
                                                </div>
                                            )}
                                            {isPDF(attachmet) && (
                                                <iframe src={attachmet.url} className="w-full h-full"></iframe>
                                            )}
                                            {!isPreviewable(attachmet) && (
                                                <div className="p-32 flex flex-col justify-center items-center text-gray-100">
                                                    <PaperClipIcon className="w-10 h-10 mb-3" />
                                                    <small>{attachmet.name}</small>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default AttachmentPreviewModal;