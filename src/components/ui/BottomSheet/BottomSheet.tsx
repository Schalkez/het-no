import { FC, ReactNode } from "react";
import { FaTimes } from "react-icons/fa";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const BottomSheet: FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  // Container cho portal (phải tồn tại trong DOM)
  const portalRoot = document.getElementById("portal-root");

  // Nếu không tìm thấy portalRoot, trả về null hoặc fallback
  if (!portalRoot) {
    console.error(
      "Portal root not found. Please ensure #portal-root exists in your HTML."
    );
    return null;
  }

  // Nội dung BottomSheet sẽ được đưa vào portal
  const bottomSheetContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 md:hidden"
            onClick={onClose}
          />
          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-lg p-4 max-h-[80vh] overflow-y-auto z-50 md:hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{title}</h2>
              <Button variant="ghost" onClick={onClose}>
                <FaTimes />
              </Button>
            </div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  // Sử dụng createPortal để render vào #portal-root
  return createPortal(bottomSheetContent, portalRoot);
};
