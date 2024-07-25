import {
  Grid,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { Item } from "../../type/ItemType";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { itemListAtom } from "../../Jotai/atoms";

type Props = {
  isOpen: boolean;
  onClose: (newItem: Item) => void;
  item: Item | undefined;
};

export const EditModal = (props: Props) => {
  const { isOpen, onClose, item } = props;

  const [modalTitle, setModalTitle] = useState<string>(item?.title || "");

  const [modalAmounts, setModalAmounts] = useState<number | null>(
    item?.amounts || 1
  );
  const [modalMemo, setModalMemo] = useState<string>(item?.memo || "");

  const [itemList, setItemList] = useAtom(itemListAtom);

  useEffect(() => {
    if (item) {
      setModalTitle(item.title || "");
      setModalAmounts(item.amounts || 1);
      setModalMemo(item.memo || "");
    }
  }, [item]);

  const onChangeModalTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModalTitle(e.target.value);
  };

  const onChangeModalAmounts = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "") {
      setModalAmounts(Number(e.target.value));
    } else {
      setModalAmounts(null);
    }
  };
  const onChangeModalMemo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setModalMemo(e.target.value);
  };

  const onCloseUpdateItem = () => {
    const newItem: Item = {
      ...item,
      id: item?.id || uuidv4(),
      title: modalTitle,
      amounts: modalAmounts !== null ? modalAmounts : 1,
      memo: modalMemo,
    };
    const newItemlist = itemList.map((item) => {
      return item.id === newItem.id ? newItem : item;
    });
    setItemList(newItemlist);
    onClose(newItem);
  };

  return (
    <Modal isOpen={isOpen} onClose={onCloseUpdateItem}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>詳細</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid gridTemplateColumns="75px auto" gap={2} alignItems="center">
            <Text>買うもの</Text>
            <Input value={modalTitle} onChange={onChangeModalTitle} />
            <Text>数量</Text>
            <Input
              type="number"
              value={modalAmounts !== null ? modalAmounts : ""}
              onChange={onChangeModalAmounts}
              placeholder="1"
              w={100}
            />
            <Text>メモ</Text>
            <Textarea
              value={modalMemo}
              onChange={onChangeModalMemo}
              placeholder="メモを入力"
            />
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
