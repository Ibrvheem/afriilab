import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "../ui/checkbox";

export default function ControlledCheckbox({
  name,
  label,
  description,
  optional,
  className,
}: {
  name: string;
  label?: string;
  description?: string;
  optional?: boolean;
  className?: string;
}) {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className="">
          <FormControl>
            <Checkbox
              className={`placeholder:text-muted-foreground relative ${className} mt-1 mr-2`}
              {...field}
            />
          </FormControl>
          <FormLabel>
            {label} {optional && <span className="text-xs">(optional)</span>}{" "}
          </FormLabel>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
