import { passwordSchema } from "@/lib/zod";
import z from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: passwordSchema("Current Password"),
    newPassword: passwordSchema("New Password"),
    confirmNewPassword: passwordSchema("Confirm New Password"),
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "The new password must be different from the current password",
    path: ["newPassword"],
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New passwords must match",
    path: ["confirmNewPassword"],
  });
