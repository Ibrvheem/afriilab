import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ControlledSelect({
  name,
  label,
  placeholder,
  description,
  optional,
  values,
}: {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  optional?: boolean;
  values: { name: string; value: string }[];
}) {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className="text-left">
          <FormLabel className="text-sm font-normal">
            {label}{" "}
            {optional && (
              <span className="text-muted-foreground text-xs">(optional)</span>
            )}
          </FormLabel>{" "}
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {values.map((val) => {
                return (
                  <SelectItem value={val.value} key={val.value}>
                    {val.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
