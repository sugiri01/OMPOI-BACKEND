"use client";

import React, { useState } from "react";
import InventoryHeader from "./_components/InventoryHeader";
import InventoryStats from "./_components/InventoryStats";
import InventoryFilters from "./_components/InventoryFilters";
import InventoryTabs from "./_components/InventoryTabs";
import UpdateStockDialog from "./_components/UpdateStockDialog";
import { Product } from "@/lib/types/product";
import InventoryTable from "./_components/InventoryTable";

const InventoryManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [adjustmentType, setAdjustmentType] = useState<
    "add" | "remove" | "set"
  >("add");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <div>
      <main>
          <InventoryHeader
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        <InventoryStats />
        <InventoryTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setSelectedProduct={setSelectedProduct}
          setIsUpdateDialogOpen={setIsUpdateDialogOpen}
        />

      </main>

      <UpdateStockDialog
        isOpen={isUpdateDialogOpen}
        onClose={setIsUpdateDialogOpen}
        selectedProduct={selectedProduct}
        adjustmentType={adjustmentType}
        setAdjustmentType={setAdjustmentType}
      />
    </div>
  );
};

export default InventoryManagementPage;
