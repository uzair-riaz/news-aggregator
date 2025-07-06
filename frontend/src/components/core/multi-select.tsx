import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

export const MultiSelect = ({
  options,
  selected,
  setSelected,
  label,
  fieldName,
  handleMultiSelect,
}: {
  options: string[];
  selected: string[];
  setSelected: (field: string, value: any) => void;
  label: string;
  fieldName: string;
  handleMultiSelect: (
    value: any,
    selected: any,
    setSelected: any,
    fieldName: any
  ) => void;
}) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    <Select
      onValueChange={(value) =>
        handleMultiSelect(value, selected, setSelected, fieldName)
      }
    >
      <SelectTrigger>
        <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    <div className="flex flex-wrap gap-2 mt-2">
      {selected.map((item) => (
        <Badge key={item} variant="secondary" className="text-sm py-1 px-2">
          {item}
          <button
            onClick={() =>
              setSelected(
                fieldName,
                selected.filter((i) => i !== item)
              )
            }
            className="ml-2 hover:text-destructive focus:outline-none"
            aria-label={`Remove ${item}`}
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
    </div>
  </div>
);
