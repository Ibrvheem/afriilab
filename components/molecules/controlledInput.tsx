import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function ControlledInput({
  name,
  label,
  placeholder,
  description,
  defaultValue,
  optional,
  disabled = false,
  type = "text",
  className,
}: {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  defaultValue?: string;
  optional?: boolean;
  disabled?: boolean;
  type?: string;
  className?: string;
}) {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label} {optional && <span className="text-xs">(optional)</span>}{" "}
          </FormLabel>
          <FormControl>
            <Input
              className={`placeholder:text-muted-foreground relative ${className}`}
              disabled={disabled}
              placeholder={placeholder}
              defaultValue={defaultValue}
              type={type}
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
