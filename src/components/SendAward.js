import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Text,
  HStack,
  useToast,
} from '@chakra-ui/react';

const SendAward = ({ contract, account }) => {
  const [tokenId, setTokenId] = useState('');
  const [recipient, setRecipient] = useState('');

  const toast = useToast();

  const handleSendAward = async (event) => {
    event.preventDefault();

    try {
      const result = await contract.transferAward(tokenId, recipient);
      console.log('Award sent successfully:', result);
      // Success toast
      toast({
        title: 'Award sent successfully',
        description: `Token ID: ${tokenId}, Recipient: ${recipient}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error sending award:', error);
      
      toast({
        title: 'Error sending award',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack
      as="form"
      onSubmit={handleSendAward}
      spacing={4}
      width="100%"
      maxWidth="500px"
    >
      <Text fontSize="xl">Send Award</Text>
      <HStack width="100%" spacing={4}>
        <FormControl isRequired>
          <FormLabel htmlFor="tokenId">Token ID:</FormLabel>
          <Input
            id="tokenId"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="recipient">Recipient Address:</FormLabel>
          <Input
            id="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </FormControl>
      </HStack>
      <Button type="submit" colorScheme="teal">
        Send Award
      </Button>
    </VStack>
  );
};

export default SendAward;
