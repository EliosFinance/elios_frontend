import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Switch from "@/components/ui/switch";
import { Label } from "@/components/ui/label";


const MyNotifications = () => {
  const [settings, setSettings] = useState({
    email: true,
    push: false,
    maj: true,

  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-100 p-4 overflow-hidden">
      <div className="w-full max-w-[360px] bg-white max-h-[793px] p-4 flex flex-col space-y-4 overflow-auto h-full">
        <h1 className="text-2xl font-semibold text-gray-900 text-center">Notifications</h1>
        <p className="text-gray-500 text-sm text-center">Gérez vos préférences de notifications</p>

      
        <Card className="p-2 bg-white">
          <CardContent className="grid grid-cols-2 gap-2">
            {Object.entries(settings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-2">
                <Label className="capitalize text-gray-700 font-medium text-xs">{key}</Label>
                <Switch className="scale-50" checked={value} onCheckedChange={() => toggleSetting(key as keyof typeof settings)} />
              </div>
            ))}
          </CardContent>
        </Card>

      
        <div className="flex flex-col space-y-4 mt-2 flex-grow overflow-auto relative">
          <div className="sticky top-0 bg-white z-10 p-2 border-b border-gray-300">
            <h2 className="text-xl font-semibold text-gray-900">Vos Notifications</h2>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg min-h-[500px] flex flex-col gap-3 overflow-auto max-h-[400px]">
            {Object.entries(settings).filter(([_, value]) => value).length > 0 ? (
              Object.entries(settings)
                .filter(([_, value]) => value)
                .map(([key]) => (
                  <div key={key} className="p-3 bg-white rounded-lg text-gray-800">
                    Nouvelle notification activée pour <strong>{key}</strong>
                  </div>
                ))
            ) : (
              <p className="text-gray-500 text-center">Aucune notification pour le moment</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyNotifications;
