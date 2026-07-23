export type MockCustomer = {
  firstName: string;
  lastName: string;
  email: string;
  memberSince: string;
};

export const mockAccountStorageKey = 'viewbrush-mock-customer';

export const defaultMockCustomer: MockCustomer = {
  firstName: 'Ryan',
  lastName: 'Liu',
  email: 'ryan.liu@example.com',
  memberSince: 'July 2026',
};

export function getMockCustomerName(customer: MockCustomer) {
  return `${customer.firstName} ${customer.lastName}`.trim();
}
