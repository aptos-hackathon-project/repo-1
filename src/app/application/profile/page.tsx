import React from "react";
import { Linechart } from "@/components/ui/linechart";
import ProfileIcon from "@/components/ui/icons/profileicon";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, User, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { getUsername } from "@/view-functions/getUsername";
import { useEffect, useState } from "react";

export default function Profile() {
  const { account } = useWallet();
  const router = useRouter();
  const [username, setUsername] = useState(""); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsername = async () => {
      if (account) {
        setLoading(true);
        const fetchedUsername = await getUsername(account?.address); 
        setUsername(fetchedUsername ?? "");
        setLoading(false);
      }
    };

    fetchUsername(); 
  }, [account]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Button onClick={() => router.back()} variant="ghost" className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <div className="flex flex-col gap-6">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col justify-center items-center">
            <div className="flex flex-col items-center mb-6 w-24 h-24">
              <ProfileIcon />
              <h2 className="text-xl font-semibold">
                {loading ? "Loading..." : username || "Username not found"} {/* Display loading state or username */}
              </h2>
            </div>
            <div className="space-y-4 w-1/2">
              <div>
                <Label className="font-semibold">Account Address</Label>
                <div className="flex items-center ">
                  <Wallet className="mr-2 h-4 w-4 text-gray-500" />
                  <Input value={account?.address} disabled={true} className="font-mono text-sm" />
                </div>
              </div>

              <div>
                <Label className="font-semibold">Name</Label>
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4 text-gray-500" />
                  <Input value={username} disabled={true} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 flex flex-col justify-center items-center">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Activity Overview</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col justify-center items-center h-fit w-3/4">
            <Linechart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
