import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const ModelSubmissionForm = () => {
  const [useChatTemplate, setUseChatTemplate] = useState(false);

  return (
    <Card className="max-w-2xl mx-auto p-6 bg-background">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Model Submission Form
          </h2>
          <p className="text-muted-foreground">
            Submit your model for benchmarking
          </p>
        </div>

        <div className="space-y-6">
          {/* Model Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Model Information</h3>

            <div className="space-y-2">
              <Label htmlFor="modelName">Model Name*</Label>
              <Input
                id="modelName"
                placeholder="Example: meta-llama/Llama-2-7b-hf"
              />
              <p className="text-sm text-muted-foreground">
                Example: meta-llama/Llama-2-7b-hf
              </p>
            </div>

            <div className="space-y-2">
              <Label>Revision commit</Label>
              <Input placeholder="main" defaultValue="main" />
              <p className="text-sm text-muted-foreground">Default: main</p>
            </div>
          </div>

          {/* Model Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Model Configuration</h3>

            <div className="space-y-2">
              <Label>Model Type</Label>
              <Select defaultValue="fine-tuned">
                <SelectTrigger>
                  <SelectValue>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500">◆</span>
                      Fine-tuned
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fine-tuned">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500">◆</span>
                      Fine-tuned
                    </div>
                  </SelectItem>
                  <SelectItem value="base">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-500">◆</span>
                      Base
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Precision</Label>
              <Select defaultValue="float16">
                <SelectTrigger>
                  <SelectValue placeholder="Select precision" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="float16">float16</SelectItem>
                  <SelectItem value="float32">float32</SelectItem>
                  <SelectItem value="int8">int8</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Weights Type</Label>
              <Select defaultValue="original">
                <SelectTrigger>
                  <SelectValue placeholder="Select weights type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="original">Original</SelectItem>
                  <SelectItem value="quantized">Quantized</SelectItem>
                  <SelectItem value="pruned">Pruned</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="chat-template"
                checked={useChatTemplate}
                onCheckedChange={setUseChatTemplate}
              />
              <Label htmlFor="chat-template">Use Chat Template</Label>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-sm text-muted-foreground mb-4">
              All fields marked with * are required
            </p>
            <Button className="w-full" size="lg">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ModelSubmissionForm;
