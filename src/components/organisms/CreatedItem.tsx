import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Item } from "../../type/ItemType";
import { useAtom } from "jotai";
import { itemListAtom } from "../../Jotai/atoms";

type Props = {
  setSelectedItem: (item: Item) => void;
  onOpen: () => void;
};

export const CreatedItem = (props: Props) => {
  const { setSelectedItem, onOpen } = props;

  const onClickDeleteItem = (id: string) => {
    const newItemList = itemList.filter((item: Item) => item.id !== id);
    setItemList(newItemList);
  };

  const onClickDetailButton = (item: Item) => {
    setSelectedItem(item);
    onOpen();
  };

  const [itemList, setItemList] = useAtom(itemListAtom);

  return (
    <>
      {itemList.map((item: Item) => (
        <Flex
          key={item.id}
          p={2}
          alignItems="center"
          justifyContent="space-between"
          border="1px solid #ccc"
          borderRadius="10px"
        >
          <Text>{item.title}</Text>
          <Text>{item.memo}</Text>
          <Text>{item.amounts}</Text>
          <Box>
            <Button onClick={() => onClickDetailButton(item)}>編集</Button>
            <Button onClick={() => onClickDeleteItem(item.id)}>削除</Button>
          </Box>
        </Flex>
      ))}
    </>
  );
};
