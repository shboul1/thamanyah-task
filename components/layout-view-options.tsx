"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LayoutViewOptions() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<"grid" | "scroll">("grid");
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const layout = localStorage.getItem("layout") as "grid" | "scroll";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-24 mr-4" sideOffset={5}>
        <DropdownMenuLabel>Layout</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={state || layout || "grid"}
          onValueChange={(value) => {
            localStorage.setItem("layout", value);
            setState(value as "grid" | "scroll");
            router.refresh();
          }}
        >
          <DropdownMenuRadioItem value="scroll">Scroll</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="grid">Grid</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
