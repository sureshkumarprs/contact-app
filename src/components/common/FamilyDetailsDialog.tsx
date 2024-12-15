import {
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import FamilyDetailsForm from "../FamilyDetailsForm";
import { X } from "lucide-react";

const FamilyDetailsDialog = ({ open, onClose }: any) => {
  const handleOnFormSave = () => {
    onClose();
  };

  return (
    <Dialog
      size="sm"
      className="flex flex-col items-center justify-center"
      dismiss={{ outsidePress: false }}
      {...({ open, handler: onClose } as React.ComponentProps<typeof Dialog>)}
    >
      <DialogHeader
        className="w-full justify-between"
        {...({} as React.ComponentProps<typeof DialogHeader>)}
      >
        <h2 className="text-center w-full ml-[10%]">Add a family member</h2>
        <X
          onClick={onClose}
          className="cursor-pointer text-lg font-semibold w-[10%] mb-4 text-gray-600"
        />
      </DialogHeader>
      <DialogBody {...({} as React.ComponentProps<typeof DialogHeader>)}>
        <FamilyDetailsForm onSaveDetails={handleOnFormSave} />
      </DialogBody>
      <DialogFooter
        className="w-full"
        {...({} as React.ComponentProps<typeof DialogHeader>)}
      >
        <p></p>
      </DialogFooter>
    </Dialog>
  );
};

export default FamilyDetailsDialog;
