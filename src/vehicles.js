const Vehicle = require('./models/Vehicle');

async function addVehicle(data) {
  const newVehicle = new Vehicle(data);
  return await newVehicle.save();
}

async function getVehicles() {
  return await Vehicle.find();
}

async function updateVehicle(id, data) {
  const updatedVehicle = await Vehicle.findByIdAndUpdate(id, data, { new: true });
  return updatedVehicle;
}

module.exports = { addVehicle, getVehicles, updateVehicle };
