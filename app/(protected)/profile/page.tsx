"use server";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

interface Info {
  label: string;
  value: string | null | undefined;
}

const SpanInfo = ({ label, value }: Info) => {
  return (
    <div className="grid grid-cols-2 items-center">
      <div>
      <Button variant={"secondary"} className="min-w-[100px]">{label}</Button>
      </div>
      {label === "Avatar" && value ? (
        <img src={value} width={50} height={50} alt="User Image" className="rounded-lg" />
      ) : (
        <p>{value || "null"}</p>
      )}
    </div>
  );
};

export default async function ProfilePage() {
  const session = await auth();
  const info: Info[] = [
    {
      label: "Avatar",
      value: session?.user.image,
    },
    {
      label: "Name",
      value: session?.user.name,
    },
    {
      label: "Email",
      value: session?.user.email,
    },
    {
      label: "Role",
      value: session?.user.role,
    },
    {
      label: "Provider",
      value: session?.user.provider,
    },
  ];

  return (
    <div className="flex justify-center items-center h-full mt-5">
      <Card className="lg:min-w-[400px]">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            {info.map((el, index) => (
              <div key={index}>
                <SpanInfo {...el} />
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <form action={async() => {
            "use server"
            await signOut()
          }}>
            <Button
              variant="destructive"
              type="submit"
            >
              Log out
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
