import { Button, Flex, Input } from "@chakra-ui/react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Item } from "../../type/ItemType";
import { useAtom } from "jotai";
import { itemListAtom } from "../../Jotai/atoms";

export const ItemInputForm = () => {
  const [itemNameInput, setItemNameInput] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [itemList, setItemList] = useAtom(itemListAtom);

  const AddItem = () => {
    const newItem: Item = {
      id: uuidv4(),
      title: itemNameInput,
      memo: "",
      amounts: 1,
    };
    const newItemList = [...itemList, newItem];
    setItemList(newItemList);
    setItemNameInput("");
    setIsDisabled(true);
  };

  const handleKeyDownEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isDisabled) {
      AddItem();
    }
  };

  const onChangeItemName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemNameInput(e.target.value);
    setIsDisabled(e.target.value.trim().length === 0);
  };
  return (
    <Flex>
      <Input
        placeholder="買いたい物の名前を入力"
        value={itemNameInput}
        onChange={onChangeItemName}
        onKeyDown={handleKeyDownEnter}
      />
      <Button onClick={AddItem} isDisabled={isDisabled}>
        追加
      </Button>
    </Flex>
  );
};
