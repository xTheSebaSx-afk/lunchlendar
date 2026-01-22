import { useEffect } from 'react'

function Modal({ children, open, onClose }) {
    useEffect(() => {
        if (open) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        return () => document.body.classList.remove("overflow-hidden");
    }, [open]);

    if (!open) return;

    return (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-lg min-w-[300px] relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-black">
                    ✕
                </button>
                {children}
            </div>
        </div>
    )
}

export default Modal