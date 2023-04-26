export interface Device {
  deviceName: string;
  deviceType: "Smartphone" | "Tablet" | "Camera";
  ownerName: string;
  batteryStatus: number;
}
