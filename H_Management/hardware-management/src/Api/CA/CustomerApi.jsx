const API_BASE = "https://hms-back-5gbr.onrender.com/api/v1/customers";

// ✅ Create customer
export async function createCustomer(customerData) {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customerData),
  });
  if (!response.ok) throw new Error("Failed to create customer");
  return response.json();
}

// ✅ Get all customers
export async function getAllCustomers() {
  const response = await fetch(API_BASE);
  if (!response.ok) throw new Error("Failed to fetch customers");
  return response.json();
}

// ✅ Get customer by ID
export async function getCustomerById(id) {
  const response = await fetch(`${API_BASE}/${id}`);
  if (!response.ok) throw new Error("Customer not found");
  return response.json();
}

// ✅ Update customer
export async function updateCustomer(id, updatedData) {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  if (!response.ok) throw new Error("Failed to update customer");
  return response.json();
}

// ✅ Delete customer
export async function deleteCustomer(id) {
  const response = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Failed to delete customer");
  return true;
}
