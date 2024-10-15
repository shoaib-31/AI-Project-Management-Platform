import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div>
      <Input type={"text"} placeholder={"Input"} />
      <Button size={"lg"}>Primary</Button>
      <Button variant={"secondary"} size={"lg"}>
        Secondary
      </Button>
      <Button variant={"destructive"} size={"lg"}>
        Destructive
      </Button>
      <Button variant={"ghost"} size={"lg"}>
        Ghost
      </Button>
      <Button variant={"muted"} size={"lg"}>
        Muted
      </Button>
      <Button variant={"outline"} size={"lg"}>
        Outline
      </Button>
      <Button variant={"tertiary"} size={"lg"}>
        Tertiary
      </Button>
    </div>
  );
}
