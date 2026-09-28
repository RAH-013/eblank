import { connectDatabase, db } from "./db.ts";

const roles = [
  {
    key: "user",
    name: "Usuario",
    description: "Cliente que puede realizar compras en la tienda",
  },
  {
    key: "manager",
    name: "Gerente",
    description: "Gestiona productos, categorías, precios e inventario",
  },
  {
    key: "fulfillment",
    name: "Logística",
    description: "Gestiona la preparación, empaquetado y envío de pedidos",
  },
  {
    key: "support",
    name: "Soporte",
    description: "Gestiona la atención y asistencia a clientes",
  },
  {
    key: "finance",
    name: "Finanzas",
    description: "Gestiona pagos, reembolsos y facturación",
  },
  {
    key: "admin",
    name: "Administrador",
    description: "Gestiona usuarios, roles y configuración administrativa",
  },
];

const admin = {
  email: "admin@eblank.local",
  name: "Administrador",
};

let pendingSeed: Promise<void> | undefined;

async function runSeed(): Promise<void> {
  await connectDatabase();

  for (const role of roles) {
    await db.orm.public.Role.upsert({
      create: {
        id: crypto.randomUUID(),
        ...role,
      },
      update: {
        name: role.name,
        description: role.description,
      },
      conflictOn: {
        key: role.key,
      },
    });
  }

  const adminUser = await db.orm.public.User.upsert({
    create: {
      id: crypto.randomUUID(),
      email: admin.email,
      name: admin.name,
      type: "STAFF",
    },
    update: {},
    conflictOn: {
      email: admin.email,
    },
  });

  const adminRole = await db.orm.public.Role.upsert({
    create: {
      id: crypto.randomUUID(),
      ...roles.find((role) => role.key === "admin")!,
    },
    update: {},
    conflictOn: {
      key: "admin",
    },
  });

  await db.orm.public.UserRole.upsert({
    create: {
      userId: adminUser.id,
      roleId: adminRole.id,
    },
    update: {},
    conflictOn: {
      userId: adminUser.id,
      roleId: adminRole.id,
    },
  });
}

export function seed(): Promise<void> {
  pendingSeed ??= runSeed().catch((error: unknown) => {
    pendingSeed = undefined;
    throw error;
  });

  return pendingSeed;
}
