import { Container, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { ItemInputForm } from "./components/molecules/ItemInputForm";
import { CreatedItem } from "./components/organisms/CreatedItem";
import { EditModal } from "./components/organisms/EditModal";
import { Item } from "./type/ItemType";

function App() {
  const [selectedItem, setSelectedItem] = useState<Item>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Container textAlign="center">
      <Text>買い物リスト</Text>
      <Stack>
        <ItemInputForm />
        <CreatedItem setSelectedItem={setSelectedItem} onOpen={onOpen} />
      </Stack>
      <EditModal isOpen={isOpen} onClose={onClose} item={selectedItem} />
    </Container>
  );
}

export default App;
