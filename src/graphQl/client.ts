import { ApolloClient, InMemoryCache } from "@apollo/client";

function mergeObject() {
  return {
    read: (current: any) => current,
    merge: (prev: any, next: any) => {
      const info = next.info;
      const results = [...(prev ? prev.results : []), ...next.results];
      return { info, results };
    },
  };
}

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          characters: mergeObject(),
        },
      },
    },
  }),
});
