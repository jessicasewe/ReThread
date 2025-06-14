"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface MobileMenuButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function MobileMenuButton({ isOpen, onToggle }: MobileMenuButtonProps) {
  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" onClick={onToggle}>
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
    </div>
  );
}
