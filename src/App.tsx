import {
  Box,
  Button,
  ChakraProvider,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

interface Sector {
  value?: string;
  label?: string;
}

const App: React.FC = () => {
  const [name, setName] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [agree, setAgree] = useState(false);
  const [savedData, setSavedData] = useState<any>({});

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/yeasinshamimdev/mock-data-for-task/main/mock-data-for-task.json')
      .then((response) => response.json())
      .then((data) => setSectors(data))
      .catch((error) => console.error(error));
  }, []);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleAgreeChange = () => {
    setAgree(!agree);
  };

  const handleSave = () => {
    // Validate input data
    if (!name || selectedOptions.length === 0 || !agree) {
      alert('Please fill in all the fields');
      return;
    }
    // Simulate saving data to the database
    const savedData = {
      name,
      sectors: selectedOptions,
      agree,
    };

    setSavedData(savedData);
  };

  const handleEdit = () => {
    // Reset form and allow editing
    setName('');
    setAgree(false);
    setSavedData({});
  };

  return (
    <ChakraProvider>
      <Box maxW="500px" m="auto" p={4}>
        <Stack spacing={4}>
          <Heading as="h1" size="xl" textAlign="center">
            My Form
          </Heading>

          <FormControl id="name" isRequired>
            <FormLabel>Name:</FormLabel>
            <Input type="text" value={name} onChange={handleNameChange} />
          </FormControl>

          {/* <FormControl id="sectors" isRequired>
            <FormLabel>Sectors:</FormLabel>
            <Select value={selectValue.label} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectValue(e.target.value)}  >
              {sectors.map((sector: any) => (
                <option key={sector.value} value={sector.label}>
                  {sector.label}
                </option>
              ))}
            </Select>
          </FormControl> */}

          <FormControl id="sectors" isRequired>
            <FormLabel>Sectors:</FormLabel>
            <Text fontSize={"12px"} color={"green"}>You can select data as much you can!</Text>
            <Select h={"100px"}
              iconColor='white'
              multiple
              value={selectedOptions}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setSelectedOptions(Array.from(e.target.selectedOptions, (option) => option.value))
              }
            >
              {sectors.map((sector: Sector) => (
                <option key={sector.value} value={sector.label}>
                  {sector.label}
                </option>
              ))}
            </Select>
          </FormControl>


          <FormControl id="agree" isRequired>
            <Checkbox isChecked={agree} onChange={handleAgreeChange}>
              I agree to the terms and conditions
            </Checkbox>
          </FormControl>

          <Button colorScheme="blue" onClick={handleSave}>
            Save
          </Button>

          {savedData.name && (
            <Box>
              <Heading as="h2" size="md" textAlign="center" mt={4}>
                Saved Data:
              </Heading>
              <Box mt={2}>
                <strong>Name:</strong> {savedData.name}
              </Box>
              <Box>
                <strong>Sectors:</strong> {savedData?.sectors.join(', ')}
              </Box>
              <Box>
                <strong>Agreed:</strong> {savedData.agree ? 'Yes' : 'No'}
              </Box>
              <Button colorScheme="blue" mt={2} onClick={handleEdit}>
                Edit
              </Button>
            </Box>
          )}
        </Stack>
      </Box>
    </ChakraProvider>
  );
};

export default App;
