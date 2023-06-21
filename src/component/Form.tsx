import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

function Form() {
  const [name, setName] = useState('');
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(false);
  const [sectors, setSectors] = useState([]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSectorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const options = event.target.options;
    const selectedValues: string[] = [];

    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }

    setSelectedSectors(selectedValues);
  };

  const handleAgreementChange = () => {
    setAgreed(!agreed);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = {
      name: name,
      sectors: selectedSectors,
      agreed: agreed
    };

    // Save form data to localStorage
    localStorage.setItem('formData', JSON.stringify(formData));

    // Reset the form fields
    setName('');
    setSelectedSectors([]);
    setAgreed(false);
  };

  useEffect(() => {
    // Retrieve form data from localStorage
    const storedFormData = localStorage.getItem('formData');

    if (storedFormData) {
      const parsedFormData = JSON.parse(storedFormData);

      // Set the form data in the state variables
      setName(parsedFormData.name);
      setSelectedSectors(parsedFormData.sectors);
      setAgreed(parsedFormData.agreed);
    }
  }, []);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/yeasinshamimdev/mock-data-for-task/main/mock-data-for-task.json')
      .then(response => response.json())
      .then(data => setSectors(data))
      .catch(error => console.error(error));
  }, []);


  return (
    <Container maxW="sm">
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Name:</FormLabel>
          <Input type="text" value={name} onChange={handleNameChange} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Sectors:</FormLabel>
          <Select multiple size="5" value={selectedSectors} onChange={handleSectorChange}>
            {sectors.map((sector: any) => (
              <option key={sector.value} value={sector.value}>{sector.label}</option>
            ))}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <Checkbox isChecked={agreed} onChange={handleAgreementChange}>
            Agree to terms
          </Checkbox>
        </FormControl>

        <Button type="submit" colorScheme="blue" size="md">
          Save
        </Button>
      </form>
    </Container>
  );
}

export default Form;

