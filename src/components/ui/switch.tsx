import * as SwitchPrimitive from "@radix-ui/react-switch";

const Switch = ({ checked = false, onCheckedChange = () => {} }) => (
  <SwitchPrimitive.Root
    className="w-10 h-6 bg-gray-200 rounded-full relative flex items-center transition-colors duration-200 focus:outline-none data-[state=checked]:bg-blue-500"
    checked={checked}
    onCheckedChange={(checked) => onCheckedChange?.()}
  >
    <SwitchPrimitive.Thumb 
      className="block w-4 h-4 bg-white rounded-full transition-transform duration-200 transform translate-x-1 will-change-transform data-[state=checked]:translate-x-5"
    />
  </SwitchPrimitive.Root>
);

export default Switch;
