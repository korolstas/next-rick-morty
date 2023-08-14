import { IAllHeroes } from "@/types/redux-interfaces";
import { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  request?: Response;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    debugger;
    const result = await fetch("https://rickandmortyapi.com/api/character", {
      headers: {
        // "content-type": "application/json",
        "cache-control": " max-age=10, stale-while-revalidate=600",
      },
    });
    console.log(result, " => ", result.json());
    return res.status(200).send({ request: result });
  } catch (err: any) {
    return res.status(500).send({ error: err });
  }
}
