import { Text, TextInput, View } from "react-native";

export default function FormField({
  value,
  onValueChange,
  placeholder,
  label,
  secureTextEntry,
}: {
  label: string;
  value: string;
  onValueChange: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
}) {
  return (
    <>
      <Text className="pl-2 font-pmedium pb-3 text-base">{label}</Text>
      <View className="w-full h-16 border-[1px] border-neutral-300 rounded-xl items-start">
        <TextInput
          className=" flex-1 text-base text-black  caret-black w-full px-3"
          value={value}
          placeholder={placeholder}
          placeholderTextColor={"gray"}
          onChangeText={onValueChange}
          secureTextEntry={secureTextEntry}
        />
      </View>
    </>
  );
}
