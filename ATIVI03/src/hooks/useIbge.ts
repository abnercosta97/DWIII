import { useContext } from "react";
import { ctx } from "../contexts/Contexto";

export default function useIbge() {
    return useContext(ctx);
}