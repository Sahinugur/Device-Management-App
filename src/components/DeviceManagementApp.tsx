import React, { useState } from "react";
import { Device } from "../types/Device";


const initialDevices: Device[] = [
  {
    deviceName: "iPhone 13",
    deviceType: "Smartphone",
    ownerName: "John Doe",
    batteryStatus: 80,
  },
  {
    deviceName: "Samsung Galaxy Tab S7",
    deviceType: "Tablet",
    ownerName: "Jane Smith",
    batteryStatus: 50,
  },
  {
    deviceName: "Canon EOS R6",
    deviceType: "Camera",
    ownerName: "Tom Lee",
    batteryStatus: 20,
  },
];

const DeviceManagementApp: React.FC = () => {
  const [devices, setDevices] = useState(initialDevices);
  const [sortedBy, setSortedBy] = useState<
    "deviceName" | "deviceType" | "ownerName" | "batteryStatus"
  >("deviceName");
  const [editingDevice, setEditingDevice] = useState<Device | null>(null);
  const [newDevice, setNewDevice] = useState<Device>({
    deviceName: "",
    deviceType: "Smartphone",
    ownerName: "",
    batteryStatus: 0,
  });

  const handleSortBy = (
    key: "deviceName" | "deviceType" | "ownerName" | "batteryStatus"
  ) => {
    setSortedBy(key);
  };

  const handleEditDevice = (device: Device) => {
    setEditingDevice(device);
  };

  const handleSaveDevice = () => {
    if (editingDevice) {
      const updatedDevices = devices.map((device) =>
        device.deviceName === editingDevice.deviceName ? editingDevice : device
      );
      setDevices(updatedDevices);
      setEditingDevice(null);
    } else {
      setDevices([...devices, newDevice]);
      setNewDevice({
        deviceName: "",
        deviceType: "Smartphone",
        ownerName: "",
        batteryStatus: 0,
      });
    }
  };

  const handleDeleteDevice = (device: Device) => {
    const updatedDevices = devices.filter(
      (d) => d.deviceName !== device.deviceName
    );
    setDevices(updatedDevices);
  };

  return (
    <div>
      <h1>Device Management App</h1>
      <button onClick={() => setEditingDevice(null)}>Add New Device</button>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSortBy("deviceName")}>Device Name</th>
            <th onClick={() => handleSortBy("deviceType")}>Device Type</th>
            <th onClick={() => handleSortBy("ownerName")}>Owner Name</th>
            <th onClick={() => handleSortBy("batteryStatus")}>
              Battery Status
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {devices
            .sort((a, b) => (a[sortedBy] < b[sortedBy] ? -1 : 1))
            .map((device) => (
              <tr key={device.deviceName}>
                <td>{device.deviceName}</td>
                <td>{device.deviceType}</td>
                <td>{device.ownerName}</td>
                <td>{device.batteryStatus}%</td>
                <td>
                  <button onClick={() => handleEditDevice(device)}>Edit</button>
                  <button onClick={() => handleDeleteDevice(device)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {editingDevice && (
        <div>
          <h2>Edit Device</h2>
          <label>
            Device Name:
            <input
              type="text"
              value={editingDevice.deviceName}
              onChange={(e) =>
                setEditingDevice({
                  ...editingDevice,
                  deviceName: e.target.value,
                })
              }
            />
          </label>
          <br />
          <label>
            Device Type:
            <select
              value={editingDevice.deviceType}
              onChange={(e) =>
                setEditingDevice({
                  ...editingDevice,
                  deviceType: e.target.value as Device["deviceType"],
                })
              }
            >
              <option value="Smartphone">Smartphone</option>
              <option value="Tablet">Tablet</option>
              <option value="Camera">Camera</option>
            </select>
          </label>
          <br />
          <label>
            Owner Name:
            <input
              type="text"
              value={editingDevice.ownerName}
              onChange={(e) =>
                setEditingDevice({
                  ...editingDevice,
                  ownerName: e.target.value,
                })
              }
            />
          </label>
          <br />
          <label>
            Battery Status:
            <input
              type="number"
              value={editingDevice.batteryStatus}
              onChange={(e) =>
                setEditingDevice({
                  ...editingDevice,
                  batteryStatus: parseInt(e.target.value),
                })
              }
            />
          </label>
          <br />
          <button onClick={handleSaveDevice}>Save</button>
          <button onClick={() => setEditingDevice(null)}>Cancel</button>
        </div>
      )}
      {!editingDevice && (
        <div>
          <h2>Add New Device</h2>
          <label>
            Device Name:
            <input
              type="text"
              value={newDevice.deviceName}
              onChange={(e) =>
                setNewDevice({ ...newDevice, deviceName: e.target.value })
              }
            />
          </label>
          <br />
          <label>
            Device Type:
            <select
              value={newDevice.deviceType}
              onChange={(e) =>
                setNewDevice({
                  ...newDevice,
                  deviceType: e.target.value as Device["deviceType"],
                })
              }
            >
              <option value="Smartphone">Smartphone</option>
              <option value="Tablet">Tablet</option>
              <option value="Camera">Camera</option>
            </select>
          </label>
          <br />
          <label>
            Owner Name:
            <input
              type="text"
              value={newDevice.ownerName}
              onChange={(e) =>
                setNewDevice({ ...newDevice, ownerName: e.target.value })
              }
            />
          </label>
          <br />
          <label>
            Battery Status:
            <input
              type="number"
              value={newDevice.batteryStatus}
              onChange={(e) =>
                setNewDevice({
                  ...newDevice,
                  batteryStatus: parseInt(e.target.value),
                })
              }
            />
          </label>
          <br />
          <button onClick={handleSaveDevice}>Save</button>
          <button onClick={() => setEditingDevice(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default DeviceManagementApp;
