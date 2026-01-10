"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Save, X, Plus, Settings, AlertCircle } from "lucide-react";
import { Product } from "@/lib/types/product";

interface UpdateStockDialogProps {
  isOpen: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProduct: Product | null;
  adjustmentType: "add" | "remove" | "set";
  setAdjustmentType: React.Dispatch<
    React.SetStateAction<"add" | "remove" | "set">
  >;
}

export default function UpdateStockDialog({
  isOpen,
  onClose,
  selectedProduct,
  adjustmentType,
  setAdjustmentType,
}: UpdateStockDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Update Stock Level</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label>Product Name</Label>
            <Input
              disabled
              value={selectedProduct?.name || ""}
              className="mt-2"
            />
          </div>

          <div>
            <Label>Current Stock (MT)</Label>
            <Input
              disabled
              value={selectedProduct?.currentStock ?? ""}
              className="mt-2"
            />
          </div>

          <div>
            <Label>Stock Adjustment Type</Label>
            <div className="flex space-x-2 mt-2">
              <Button
                variant={adjustmentType === "add" ? "default" : "outline"}
                onClick={() => setAdjustmentType("add")}
                className={adjustmentType === "add" ? "bg-blue-600" : ""}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Stock
              </Button>
              <Button
                variant={adjustmentType === "remove" ? "default" : "outline"}
                onClick={() => setAdjustmentType("remove")}
                className={adjustmentType === "remove" ? "bg-red-600" : ""}
              >
                <X className="w-4 h-4 mr-2" />
                Remove Stock
              </Button>
              <Button
                variant={adjustmentType === "set" ? "default" : "outline"}
                onClick={() => setAdjustmentType("set")}
                className={adjustmentType === "set" ? "bg-orange-600" : ""}
              >
                <Settings className="w-4 h-4 mr-2" />
                Set Total
              </Button>
            </div>
          </div>

          <div>
            <Label>Quantity (MT)</Label>
            <Input
              placeholder="Enter quantity in MT"
              type="number"
              className="mt-2"
            />
          </div>

          <div>
            <Label>Location / Warehouse</Label>
            <Select>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tuticorin">Tuticorin</SelectItem>
                <SelectItem value="mumbai">Mumbai</SelectItem>
                <SelectItem value="kochi">Kochi</SelectItem>
                <SelectItem value="chennai">Chennai</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Reason / Notes</Label>
            <Textarea
              placeholder="Enter reason for stock adjustment"
              className="mt-2 min-h-[80px]"
            />
          </div>

          <Alert className="bg-yellow-50 border-yellow-200">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              <strong>Tip:</strong> Stock updates are audited — provide accurate
              notes for record-keeping.
            </AlertDescription>
          </Alert>

          <div className="flex space-x-2 pt-4">
            <Button className="flex-1 bg-green-500 hover:bg-green-600 text-white">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onClose(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
