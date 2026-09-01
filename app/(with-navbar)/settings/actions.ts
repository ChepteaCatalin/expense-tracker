"use server";

import {
  changePassword,
  deleteUser,
  signOut as signOutUser,
} from "@/data/auth";
import { redirect } from "next/navigation";
import {
  type ChangeCurrencyError,
  type ChangePasswordFormErrors,
  type ChangePasswordFormValues,
} from "./types";
import { changePasswordSchema } from "./validation";
import { getFormErrors } from "@/lib/zod";
import { APIError } from "better-auth";
import { currencies, updateCurrency as changeCurrency } from "@/data/currency";
import { revalidatePath } from "next/cache";
import { UnauthorizedError } from "@/utils/error";

export async function signOut() {
  try {
    await signOutUser();
  } catch (error) {
    return error;
  }

  revalidatePath("/", "layout");
  redirect("/signin");
}

export async function updatePassword(
  _: ChangePasswordFormErrors,
  formValues: ChangePasswordFormValues,
): Promise<ChangePasswordFormErrors> {
  const errors = getFormErrors(changePasswordSchema, formValues);
  if (errors) return errors;

  try {
    await changePassword(formValues);
    await signOut();
  } catch (error) {
    if (error instanceof APIError) return { api: error.message };
  }

  redirect("/signin");
}

export async function updateCurrency(_: ChangeCurrencyError, currency: string) {
  if (!currency || !currencies.find((c) => c.code === currency)) {
    return { currency: "Invalid currency" };
  }

  try {
    await changeCurrency(currency);
  } catch (err: any) {
    if (err instanceof UnauthorizedError) redirect("/signin");
    return { api: "Failed to update currency" };
  }

  return {};
}

export async function deleteAccount(): Promise<string> {
  try {
    await deleteUser();
  } catch (error) {
    if (error instanceof APIError) {
      if (error.body?.code === "SESSION_EXPIRED") {
        return "For security reasons, this action requires a recent sign-in. Please sign out, sign back in, and try again.";
      }
      return error.message;
    }
    return "Failed to delete account";
  }

  revalidatePath("/", "layout");
  redirect("/signup");
}
