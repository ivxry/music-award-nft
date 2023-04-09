import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Button, Input, Stack, FormControl, FormLabel, useToast } from '@chakra-ui/react';

const ManageMinter = ({ contract, signer }) => {
  const [minterAddress, setMinterAddress] = useState('');
  const toast = useToast();

  const handleApproveMinter = async () => {
    if (!signer) {
      toast({
        title: 'Error',
        description: 'Please connect your wallet before approving a minter.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      await contract.connect(signer).addApprovedMinter(minterAddress);
      toast({
        title: 'Minter Approved',
        description: `Address ${minterAddress} has been approved as a minter.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleRemoveMinter = async () => {
    if (!signer) {
      toast({
        title: 'Error',
        description: 'Please connect your wallet before removing a minter.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      await contract.connect(signer).removeApprovedMinter(minterAddress);
      toast({
        title: 'Minter Removed',
        description: `Address ${minterAddress} has been removed as a minter.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Stack spacing={4}>
      <FormControl>
        <FormLabel>Manage Minter</FormLabel>
        <Input
          type="text"
          placeholder="Enter minter address"
          value={minterAddress}
          onChange={(e) => setMinterAddress(e.target.value)}
        />
      </FormControl>
      <Stack direction="row" spacing={4}>
        <Button colorScheme="teal" onClick={handleApproveMinter}>
          Approve Minter
        </Button>
        <Button colorScheme="teal" onClick={handleRemoveMinter}>
          Remove Minter
        </Button>
      </Stack>
    </Stack>
  );
};

export default ManageMinter;
