import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, AlertCircle, Trash2 } from "lucide-react";

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName?: string;
    title?: string;
    description?: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    itemName,
    title = "Confirm Delete",
    description = "Are you sure you want to delete this item? This action cannot be undone."
}) => {
    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300" />
                <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 w-full max-w-md shadow-2xl border border-gray-100 outline-none animate-in fade-in-90 zoom-in-90">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <Dialog.Title className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-red-500" />
                            {title}
                        </Dialog.Title>
                        <Dialog.Close asChild>
                            <button className="rounded-full p-1 text-gray-400 hover:text-gray-600 transition-colors hover:bg-gray-100">
                                <X className="w-4 h-4" />
                            </button>
                        </Dialog.Close>
                    </div>

                    {/* Content */}
                    <div className="mb-6">
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {description}
                            {itemName && (
                                <span className="font-medium text-gray-900 block mt-2">
                                    "{itemName}"
                                </span>
                            )}
                        </p>
                    </div>

                    {/* Separator */}
                    <div className="h-px bg-gray-200 mb-6" />

                    {/* Actions */}
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center gap-2"
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete
                        </button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default DeleteModal;