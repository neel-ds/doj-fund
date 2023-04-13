import { Box, Flex, Stack, StackDivider, Text } from "@chakra-ui/react";
import React from "react";

interface txnDetails {
  from: string;
  txn: string;
  matic: string;
  message: string;
  timestamp: number;
}

export default function TxnCard({ txn }: { txn: txnDetails[] }) {
  return (
    <>
      {txn.map((item, index) => (
        <Stack divider={<StackDivider />} key="" spacing="2">
          <Box>
            <Flex alignItems={"center"}>
              <Box>
                <Text fontSize={"md"}>Address: {item.from}</Text>
              </Box>
            </Flex>
            <Box justifyContent={"end"} alignContent={"end"}>
              Matic {item.matic}
            </Box>
            <Text pt="2" fontSize="md" fontWeight={"bold"}>
              {item.message}
            </Text>
          </Box>
          <br></br>
        </Stack>
      ))}
    </>
  );
}
