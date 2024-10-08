// /src/components/Navbar/Navbar.tsx

import { auth } from "@/firebase/clientApp";
import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Directory from "./Directory/Directory";
import RightContent from "./RightContent/RightContent";
import SearchInput from './SearchInput';

const Navbar: React.FC = () => {
  const [user, loading, error] =  useAuthState(auth);
  return (
    <Flex bg='white' height='44px' padding='28px 12px' justify={{ md: 'space-between' }}>
      <Flex align='center' width={{ base:'40px', md:'auto' }} mr={{ base: 0, md: 2 }} ml={{ base: 0, md: 2 }}>
        <Image src='/images/RedditIcon.svg' alt="Reddit Icon" height='37px' />
        <Image 
          src='/images/RedditText.svg' 
          height='22px'
          alt="Reddit Text Icon"
          display={{base: 'none', md: 'unset'}}
        />
        { user && <Directory />}
      </Flex>
      <SearchInput />
      <RightContent user={user} />
    </Flex>
  )
}
export default Navbar;