import React, { useState } from 'react';

import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  VStack,
  Text,
} from '@chakra-ui/react';

const MintAward = ({ contract, signer }) => {


  const [artist, setArtist] = useState('');
  const [songTitle, setSongTitle] = useState('');
  const [certificationDate, setCertificationDate] = useState('');
  const [recordLabel, setRecordLabel] = useState('');
  const [album, setAlbum] = useState('');
  const [awardType, setAwardType] = useState('');

  const handleMintAward = async (event) => {
    event.preventDefault();

    try {
      const connectedContract = contract.connect(signer);
      const result = await connectedContract.mintAward(
        artist,
        songTitle,
        certificationDate,
        recordLabel,
        album,
        awardType
      );
      console.log('Award minted successfully:', result);
    } catch (error) {
      console.error('Error minting award:', error);
    }
  };

  return (
    <VStack
      as="form"
      onSubmit={handleMintAward}
      spacing={4}
      width="100%"
      maxWidth="500px"
    >
      <Text fontSize="xl">Mint Award</Text>
      <FormControl isRequired>
        <FormLabel htmlFor="artist">Artist:</FormLabel>
        <Input
          id="artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="songTitle">Song Title:</FormLabel>
        <Input
          id="songTitle"
          value={songTitle}
          onChange={(e) => setSongTitle(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="certificationDate">Certification Date:</FormLabel>
        <Input
          id="certificationDate"
          value={certificationDate}
          onChange={(e) => setCertificationDate(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="recordLabel">Record Label:</FormLabel>
        <Input
          id="recordLabel"
          value={recordLabel}
          onChange={(e) => setRecordLabel(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="album">Album:</FormLabel>
        <Input
          id="album"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="awardType">Award Type:</FormLabel>
        <Select
          id="awardType"
          value={awardType}
          onChange={(e) => setAwardType(e.target.value)}
        >
          <option value="">Select award type</option>
          <option value="Gold">Gold</option>
          <option value="Platinum">Platinum</option>
          <option value="Diamond">Diamond</option>
        </Select>
      </FormControl>
      <Button type="submit" colorScheme="teal">
        Mint Award
      </Button>
    </VStack>
  );
};

export default MintAward;
