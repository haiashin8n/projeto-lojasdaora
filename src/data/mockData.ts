import { faker } from '@faker-js/faker';

// Configurar locale para português
faker.locale = 'pt_BR';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

export interface Sale {
  id: string;
  customer: string;
  items: Array<{
    product: Product;
    quantity: number;
  }>;
  total: number;
  paymentMethod: 'pix' | 'dinheiro' | 'cartao' | 'crediario';
  date: Date;
  cashierName: string;
}

export interface CreditAccount {
  id: string;
  clientName: string;
  phone: string;
  cpf: string;
  creditLimit: number;
  usedCredit: number;
  availableCredit: number;
  overdueAmount: number;
  nextDueDate: Date;
  futureReceivable: number;
  status: 'em_dia' | 'vencido' | 'cancelado';
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    price: 4999.99,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300&h=300&fit=crop',
    category: 'Celulares',
    stock: 15
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24',
    price: 3499.99,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop',
    category: 'Celulares',
    stock: 22
  },
  {
    id: '3',
    name: 'Nike Air Max',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
    category: 'Tênis',
    stock: 35
  },
  {
    id: '4',
    name: 'Adidas Ultraboost',
    price: 749.99,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=300&h=300&fit=crop',
    category: 'Tênis',
    stock: 28
  },
  {
    id: '5',
    name: 'Camiseta Polo',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
    category: 'Roupas',
    stock: 45
  },
  {
    id: '6',
    name: 'Jaqueta Jeans',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop',
    category: 'Roupas',
    stock: 18
  }
];

export const mockCreditAccounts: CreditAccount[] = Array.from({ length: 10 }, (_, index) => ({
  id: (index + 1).toString(),
  clientName: faker.person.fullName(),
  phone: faker.phone.number('(##) #####-####'),
  cpf: faker.string.numeric(11),
  creditLimit: faker.number.int({ min: 500, max: 5000 }),
  usedCredit: faker.number.int({ min: 100, max: 2000 }),
  availableCredit: faker.number.int({ min: 500, max: 3000 }),
  overdueAmount: Math.random() > 0.7 ? faker.number.int({ min: 50, max: 800 }) : 0,
  nextDueDate: faker.date.future(),
  futureReceivable: faker.number.int({ min: 200, max: 1500 }),
  status: Math.random() > 0.8 ? 'vencido' : 'em_dia'
}));

export const mockSalesData = Array.from({ length: 30 }, (_, index) => ({
  date: new Date(2025, 0, index + 1).toISOString().split('T')[0],
  sales: faker.number.int({ min: 5000, max: 25000 })
}));

export const mockCashierSales = [
  { name: 'Pedro Costa', sales: faker.number.int({ min: 15000, max: 45000 }) },
  { name: 'Ana Silva', sales: faker.number.int({ min: 12000, max: 40000 }) },
  { name: 'João Santos', sales: faker.number.int({ min: 10000, max: 35000 }) },
  { name: 'Maria Oliveira', sales: faker.number.int({ min: 8000, max: 30000 }) },
  { name: 'Carlos Lima', sales: faker.number.int({ min: 6000, max: 25000 }) }
];

export const generateSaleReceipt = (sale: Omit<Sale, 'id' | 'date'>): Sale => ({
  id: faker.string.uuid(),
  date: new Date(),
  ...sale
});
