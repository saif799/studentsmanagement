import { useSignupModal } from "@/context/useSignupModal";
import { Modal } from "react-native";
import { useSession } from "@/context/authProvider";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  StyleSheet,
  View,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LoadingAnimationComp } from "./LoadingComp";
import SelectDropdown from "react-native-select-dropdown";
import { ChevronDown, Search } from "lucide-react-native";
import { getSchools } from "@/hooks/getSchools";

export function SignupModal() {
  const { isOpen, change } = useSignupModal();
  const { session } = useSession();
  let {
    data: schools,
    isLoading: isLoadingSchools,
    isError: isErrorSchools,
  } = getSchools();

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [UserFamilyName, setUserFamilyName] = useState("");
  const [selectedSchool, setSelectedSchool] = useState<
    { title: string; id: string } | undefined
  >({title : "", id : ""});
  const [UserTown, setUserTown] = useState("");
  const [birthDate, setbirthDate] = useState("");
  const [level, setlevel] = useState("");
  const [Class, setClass] = useState("");

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`username, birthDate, class, level, city, familyName`)
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        Alert.alert(error.message);
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setClass(data.class);
        setlevel(data.level);
        setUserFamilyName(data.familyName);
        setUserTown(data.city);
        setbirthDate(data.birthDate);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    familyName,
    city,
    school,
  }: {
    username: string;
    familyName: string;
    school: string;
    level: string;
    city: string;
    Class: string;
    birthDate: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        username,
        familyName,
        class: Class,
        birthDate,
        level,
        city,
        school: school,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }
      change();
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <LoadingAnimationComp />;
  }

  if (isLoadingSchools) {
    return <LoadingAnimationComp />;
  }
  if (isErrorSchools || !schools) {
    Alert.alert("il n'y a pas d'école dans la base des données");
    change();
    return;
  }
  const displaySchools = schools.map((s) => ({
    title: s.username,
    id: s.id,
  }));
  const disbaled = (UserFamilyName.length < 3 || selectedSchool?.id.length === 0) ?? loading;


  return (
    <Modal
      animationType="slide"
      transparent
      visible={isOpen}
      onRequestClose={() => change()}
    >
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        style={styles.container}
        className="bg-white h-[85%] overflow-visible"
      >
        <View className="items-center ">
          <Text className=" font-pbold text-xl pb-5">compléter le profile</Text>
        </View>

        <View className="flex-row justify-between pt-6">
          <View>
            <Text className="pl-2 font-pmedium pb-2 text-base">Nom</Text>
            <View className="w-[45vw] h-16 border-[1px] border-neutral-300 rounded-xl items-start ">
              <TextInput
                cursorColor={"green"}
                className=" flex-1 text-base text-black  caret-black w-full px-3 focus:caret-black"
                value={UserFamilyName}
                placeholder={"nom de famille"}
                placeholderTextColor={"gray"}
                onChangeText={(e) => setUserFamilyName(e)}
              />
            </View>
          </View>
          <View>
            <Text className="pl-2 font-pmedium pb-2 text-base">Prenom</Text>
            <View className="w-[45vw] h-16 border-[1px] border-neutral-300 rounded-xl items-start ">
              <TextInput
                className=" flex-1 text-base text-black  caret-black w-full px-3 focus:caret-black"
                value={username}
                placeholder={"prénom"}
                placeholderTextColor={"gray"}
                onChangeText={(e) => setUsername(e)}
              />
            </View>
          </View>
        </View>
        <View className=" w-full  pt-[3%] rounded-xl">
          <Text className="pl-2 font-pmedium pb-2 text-base">Votre école</Text>
          <SelectDropdown
            data={displaySchools}
            onSelect={(selectedItem, index) => {
              setSelectedSchool(selectedItem);
            }}
            search
            renderSearchInputLeftIcon={() => <Search color="gray" />}
            searchInputStyle={{ backgroundColor: "white" }}
            searchInputTxtStyle={{ fontSize: 18, fontWeight: "500" }}
            searchPlaceHolder="Tapez le nom d'école ici"
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  <Text
                    className={`${
                      selectedItem && selectedItem.title
                        ? "font-pregular"
                        : "font-plight"
                    } text-base w-full`}
                  >
                    {(selectedItem && selectedItem.title) ||
                      "- Selectionner votre école -"}
                  </Text>
                  <ChevronDown className="text-darkestGray" strokeWidth={1.5} />
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View
                  style={{
                    ...styles.dropdownItemStyle,
                    ...(isSelected && { backgroundColor: "lightgray" }),
                  }}
                >
                  <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={true}
            dropdownStyle={styles.dropdownMenuStyle}
          />
        </View>
        <View className="flex-row justify-between pt-6">
          <View>
            <Text className="pl-2 font-pmedium pb-2 text-base">
              Date naissance
            </Text>
            <View className="w-[45vw] h-16 border-[1px] border-neutral-300 rounded-xl items-start ">
              <TextInput
                className=" flex-1 text-base text-black  caret-black w-full px-3 focus:caret-black"
                value={birthDate}
                placeholder={"DD-MM-YYYY"}
                placeholderTextColor={"gray"}
                onChangeText={(e) => setbirthDate(e)}
              />
            </View>
          </View>
          <View>
            <Text className="pl-2 font-pmedium pb-2 text-base">
              ville de naissance
            </Text>
            <View className="w-[45vw] h-16 border-[1px] border-neutral-300 rounded-xl items-start ">
              <TextInput
                className=" flex-1 text-base text-black  caret-black w-full px-3 focus:caret-black"
                value={UserTown}
                placeholder={"ville"}
                placeholderTextColor={"gray"}
                onChangeText={(e) => setUserTown(e)}
              />
            </View>
          </View>
        </View>
        <View className="flex-row justify-between pt-6">
          <View>
            <Text className="pl-2 font-pmedium pb-2 text-base">Niveau</Text>
            <View className="w-[45vw] h-16 border-[1px] border-neutral-300 rounded-xl items-start ">
              <TextInput
                className=" flex-1 text-base text-black  caret-black w-full px-3 focus:caret-black"
                value={level}
                placeholder={"niveau"}
                placeholderTextColor={"gray"}
                onChangeText={(e) => setlevel(e)}
              />
            </View>
          </View>
          <View>
            <Text className="pl-2 font-pmedium pb-2 text-base">Classe</Text>
            <View className="w-[45vw] h-16 border-[1px] border-neutral-300 rounded-xl items-start ">
              <TextInput
                className=" flex-1 text-base text-black  caret-black w-full px-3 focus:caret-black"
                value={Class}
                placeholder={"classe"}
                placeholderTextColor={"gray"}
                onChangeText={(e) => setClass(e)}
              />
            </View>
          </View>
        </View>

        <View className="pt-5 items-center gap-3 pb-10">
          <TouchableOpacity
            disabled={disbaled}
            onPress={() =>
              updateProfile({
                username,
                familyName: UserFamilyName,
                birthDate,
                Class,
                city: UserTown,
                level,
                school: selectedSchool!.id,
              })
            }
            className={`py-4 w-[45vw] justify-center items-center rounded-lg ${
              !disbaled ? "bg-primary" : "bg-disabledGray"
            }`}
          >
            <Text className=" text-white font-pbold text-base">
              {!loading ? "Enregistrer" : "en cours d'enregistrement"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
}

export function ParentSignupModal() {
  const { isOpen, change } = useSignupModal();
  const { session } = useSession();

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [UserFamilyName, setUserFamilyName] = useState("");

  const disbaled = UserFamilyName.length < 3 ?? loading;

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`username, familyName`)
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        Alert.alert(error.message);
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setUserFamilyName(data.familyName);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    familyName,
  }: {
    username: string;
    familyName: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        username,
        familyName,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }
      change();
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <LoadingAnimationComp />;
  }

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isOpen}
      onRequestClose={() => change()}
    >
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        style={styles.container}
        className="bg-white h-[85%] overflow-visible"
      >
        <View className="items-center ">
          <Text className=" font-pbold text-xl pb-5">compléter le profile</Text>
        </View>

        <View className="flex-row justify-between pt-6">
          <View>
            <Text className="pl-2 font-pmedium pb-2 text-base">Nom</Text>
            <View className="w-[45vw] h-16 border-[1px] border-neutral-300 rounded-xl items-start ">
              <TextInput
                cursorColor={"green"}
                className=" flex-1 text-base text-black  caret-black w-full px-3 focus:caret-black"
                value={UserFamilyName}
                placeholder={"nom de famille"}
                placeholderTextColor={"gray"}
                onChangeText={(e) => setUserFamilyName(e)}
              />
            </View>
          </View>
          <View>
            <Text className="pl-2 font-pmedium pb-2 text-base">Prenom</Text>
            <View className="w-[45vw] h-16 border-[1px] border-neutral-300 rounded-xl items-start ">
              <TextInput
                className=" flex-1 text-base text-black  caret-black w-full px-3 focus:caret-black"
                value={username}
                placeholder={"prénom"}
                placeholderTextColor={"gray"}
                onChangeText={(e) => setUsername(e)}
              />
            </View>
          </View>
        </View>

        <View className="pt-5 items-center gap-3 pb-10">
          <TouchableOpacity
            disabled={disbaled}
            onPress={() =>
              updateProfile({
                username,
                familyName: UserFamilyName,
              })
            }
            className={`py-4 w-[45vw] justify-center items-center rounded-lg ${
              !disbaled ? "bg-primary" : "bg-disabledGray"
            }`}
          >
            <Text className=" text-white font-pbold text-base">
              {!loading ? "Enregistrer" : "en cours d'enregistrement"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
}
export function AdminSignupModal() {
  const { isOpen, change } = useSignupModal();
  const { session } = useSession();

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [UserFamilyName, setUserFamilyName] = useState("");
  const [UserTown, setUserTown] = useState("");
  const [birthDate, setbirthDate] = useState("");

  const disbaled = UserFamilyName.length < 3 ?? loading;

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`username, birthDate, city, familyName`)
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        Alert.alert(error.message);
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setUserFamilyName(data.familyName);
        setUserTown(data.city);
        setbirthDate(data.birthDate);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    familyName,
    city,
  }: {
    username: string;
    familyName: string;
    city: string;
    birthDate: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        username,
        familyName,
        birthDate,
        city,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }
      change();
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <LoadingAnimationComp />;
  }

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isOpen}
      onRequestClose={() => change()}
    >
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        style={styles.container}
        className="bg-white h-[85%] overflow-visible"
      >
        <View className="items-center ">
          <Text className=" font-pbold text-xl pb-5">compléter le profile</Text>
        </View>

        <View className="flex-row justify-between pt-6">
          <View>
            <Text className="pl-2 font-pmedium pb-2 text-base">Nom</Text>
            <View className="w-[45vw] h-16 border-[1px] border-neutral-300 rounded-xl items-start ">
              <TextInput
                cursorColor={"green"}
                className=" flex-1 text-base text-black  caret-black w-full px-3 focus:caret-black"
                value={UserFamilyName}
                placeholder={"nom de famille"}
                placeholderTextColor={"gray"}
                onChangeText={(e) => setUserFamilyName(e)}
              />
            </View>
          </View>
          <View>
            <Text className="pl-2 font-pmedium pb-2 text-base">Prenom</Text>
            <View className="w-[45vw] h-16 border-[1px] border-neutral-300 rounded-xl items-start ">
              <TextInput
                className=" flex-1 text-base text-black  caret-black w-full px-3 focus:caret-black"
                value={username}
                placeholder={"prénom"}
                placeholderTextColor={"gray"}
                onChangeText={(e) => setUsername(e)}
              />
            </View>
          </View>
        </View>
        <View className="flex-row justify-between pt-6">
          <View>
            <Text className="pl-2 font-pmedium pb-2 text-base">
              Date naissance
            </Text>
            <View className="w-[45vw] h-16 border-[1px] border-neutral-300 rounded-xl items-start ">
              <TextInput
                className=" flex-1 text-base text-black  caret-black w-full px-3 focus:caret-black"
                value={birthDate}
                placeholder={"DD-MM-YYYY"}
                placeholderTextColor={"gray"}
                onChangeText={(e) => setbirthDate(e)}
              />
            </View>
          </View>
          <View>
            <Text className="pl-2 font-pmedium pb-2 text-base">
              ville de naissance
            </Text>
            <View className="w-[45vw] h-16 border-[1px] border-neutral-300 rounded-xl items-start ">
              <TextInput
                className=" flex-1 text-base text-black  caret-black w-full px-3 focus:caret-black"
                value={UserTown}
                placeholder={"ville"}
                placeholderTextColor={"gray"}
                onChangeText={(e) => setUserTown(e)}
              />
            </View>
          </View>
        </View>

        <View className="pt-5 items-center gap-3 pb-10">
          <TouchableOpacity
            disabled={disbaled}
            onPress={() =>
              updateProfile({
                username,
                familyName: UserFamilyName,
                birthDate,
                city: UserTown,
              })
            }
            className={`py-4 w-[45vw] justify-center items-center rounded-lg ${
              !disbaled ? "bg-primary" : "bg-disabledGray"
            }`}
          >
            <Text className=" text-white font-pbold text-base">
              {!loading ? "Enregistrer" : "en cours d'enregistrement"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  qrstyle: {
    marginTop: 5,
    alignSelf: "center",
  },
  dropdownButtonStyle: {
    width: "auto",
    height: 55,
    backgroundColor: "white",
    borderRadius: 8,
    borderColor: "lightgray",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },

  dropdownMenuStyle: {
    backgroundColor: "#white",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    backgroundColor: "white",
    textAlign: "left",
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
    textAlign: "left",
  },
});
