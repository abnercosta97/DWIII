import Principal from "./pages/Principal";
import { Provedor } from "./contexts/Contexto";

export default function App() {
  return (
    <Provedor>
      <Principal />
    </Provedor>
  )
}
