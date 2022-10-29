import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    Portal,
    Input,
    Button,
    FormControl,
    Flex,
    Box,
    Heading,
    Spacer ,
    Text ,
} from '@chakra-ui/react'

import Contador from './Contador';
import Dropdown from "~/components/Dropdown";


export default function (params) {

    return (
        <Flex width="full" align="center" justifyContent="center" padding={"20px"}>
            <Text fontSize='4xl'>AIRBNB</Text>
            <Spacer />
            <Box p={8} maxWidth="1000px" borderWidth={1} borderRadius={8} boxShadow="lg">
                <Box textAlign="center">
                
                    <FormControl as='fieldset'>
                        <Popover>
                            <PopoverTrigger>
                                <Button >Destiny</Button>
                            </PopoverTrigger>
                            <Portal>
                                <PopoverContent>
                                    <PopoverArrow />

                                    <PopoverCloseButton />
                                    <PopoverBody>
                                        <Input placeholder='Destino' />
                                    </PopoverBody>
                                </PopoverContent>
                            </Portal>
                        </Popover>

                        <Popover>
                            <PopoverTrigger>
                                <Button>Arrival</Button>
                            </PopoverTrigger>
                            <Portal>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverHeader>When?</PopoverHeader>
                                    <PopoverCloseButton />
                                    <PopoverBody>
                                        <Input type='date' />
                                    </PopoverBody>
                                </PopoverContent>
                            </Portal>
                        </Popover>

                        <Popover>
                            <PopoverTrigger>
                                <Button>Departure</Button>
                            </PopoverTrigger>
                            <Portal>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverHeader>When?</PopoverHeader>
                                    <PopoverCloseButton />
                                    <PopoverBody>
                                        <Input type='date' />
                                    </PopoverBody>
                                </PopoverContent>
                            </Portal>
                        </Popover>

                        <Popover>
                            <PopoverTrigger>
                                <Button>Travellers</Button>
                            </PopoverTrigger>
                            <Portal>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverHeader>How many?</PopoverHeader>
                                    <PopoverCloseButton />
                                    <PopoverBody>
                                        <Contador />

                                    </PopoverBody>
                                </PopoverContent>
                            </Portal>
                        </Popover>

                    </FormControl>

                    
                </Box>
                
        </Box>
        <Spacer /><Dropdown/>
        
      </Flex >
    );
}