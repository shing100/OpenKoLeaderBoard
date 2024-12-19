import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface FilterPanelProps {
  isOpen?: boolean;
  onToggle?: () => void;
  modelTypes?: string[];
  benchmarkCategories?: string[];
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  modelTypes: string[];
  modelSize: number[];
  benchmarkCategories: string[];
}

const FilterPanel = ({
  isOpen = true,
  onToggle = () => {},
  modelTypes = ["GPT", "BERT", "T5", "RoBERTa"],
  benchmarkCategories = [
    "Text Classification",
    "Question Answering",
    "Translation",
    "Summarization",
  ],
  onFilterChange = () => {},
}: FilterPanelProps) => {
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={onToggle}
      className="w-[300px] bg-background border-r"
    >
      <div className="p-4 flex items-center justify-between border-b">
        <h3 className="text-lg font-semibold">Filters</h3>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon">
            {isOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="p-4 space-y-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Model Type</h4>
          <div className="space-y-2">
            {modelTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox id={`model-${type}`} />
                <Label htmlFor={`model-${type}`}>{type}</Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="text-sm font-medium">Model Size</h4>
          <Slider
            defaultValue={[0, 100]}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Small</span>
            <span>Large</span>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="text-sm font-medium">Benchmark Category</h4>
          <RadioGroup defaultValue={benchmarkCategories[0]}>
            {benchmarkCategories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <RadioGroupItem value={category} id={`benchmark-${category}`} />
                <Label htmlFor={`benchmark-${category}`}>{category}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Separator />

        <Button
          className="w-full"
          onClick={() =>
            onFilterChange({
              modelTypes: [],
              modelSize: [0, 100],
              benchmarkCategories: [],
            })
          }
        >
          Reset Filters
        </Button>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default FilterPanel;
