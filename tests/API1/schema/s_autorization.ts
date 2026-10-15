import { z } from "zod";

// TODO оптимизировать схемы

export const positiveSchema = z.object({
  account_id: z.string(),
  email: z.string(),
  account_type: z.string(),
  email_verified: z.boolean(),
  verify_token: z.string().optional(),
});

export const errorSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z
      .object({
        failed_rules: z.array(z.string()),
      })
      .optional(),
    request_id: z.string().optional(),
  }),
});

const AccountTypeSchema = z.enum(["applicant", "employer"]);

export const emailVerificationSchema = z.object({
  email_verified: z.boolean(),
  account_id: z.uuid(),
  email: z.email(),
  account_type: AccountTypeSchema,
});

export const ErrorCodeSchema = z.enum([
  "INVALID_TOKEN",
  "EXPIRED_TOKEN",
  "ALREADY_VERIFIED",
]);

export const ErrorSchema = z.object({
  code: ErrorCodeSchema,
  message: z.string(),
  details: z.looseObject({}).optional(),
  request_id: z.string().optional(),
});

export const ErrorVerificationSchema = z.object({
  error: ErrorSchema,
});
export type ApiErrorResponse = z.infer<typeof ErrorVerificationSchema>;

export const errorResendVerificationSchema = z.object({
  error: z.object({
    code: z.enum(["INVALID_EMAIL"]),
    message: z.string(),
    details: z.looseObject({}).optional(),
    request_id: z.string().optional(),
  }),
});

export type ErrorResendVerification = z.infer<
  typeof errorResendVerificationSchema
>;

export const LoginResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.literal("Bearer"),
  expires_in: z.int().nonnegative(),
  refresh_token_expires_in: z.int().nonnegative(),
  device_id: z.string().optional(),
  device_name: z.string().optional(),
  account_id: z.uuid(),
  account_type: AccountTypeSchema,
  email: z.email(),
  email_verified: z.boolean(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export const refreshSchema = z.object({
  access_token: z.string(),
  token_type: z.literal("Bearer"),
  expires_in: z.int().positive(),
  refresh_token_expires_in: z.int().positive(),
  device_id: z.string().optional(),
  device_name: z.string().optional(),
});

export type RefreshSchema = z.infer<typeof refreshSchema>;

export const errorRefreshCodeSchema = z.enum([
  "INVALID_REFRESH_TOKEN",
  "REFRESH_TOKEN_REVOKED",
  "REFRESH_TOKEN_EXPIRED",
]);

export const errorResfreshSchema = z.object({
  error: z.object({
    code: errorRefreshCodeSchema,
    message: z.string(),
    details: z.record(z.string(), z.unknown()).optional(),
    request_id: z.string().optional(),
  }),
});

export const logoutResponseSchema = z.object({
  logged_out: z.boolean(),
});

export type LogoutResponse = z.infer<typeof logoutResponseSchema>;

export const errorlogoutCodeSchema = z.enum([
  "REFRESH_TOKEN_MISMATCH",
  "UNAUTHORIZED",
]);

export const logoutErrorResponseSchema = z.object({
  error: z.object({
    code: errorlogoutCodeSchema,
    message: z.string(),
    details: z.record(z.string(), z.unknown()).optional(),
    request_id: z.string().optional(),
  }),
});

export type LogoutErrorResponse = z.infer<typeof logoutErrorResponseSchema>;

export const jwkSchema = z.object({
  kty: z.string(),
  kid: z.string(),
  use: z.string(),
  alg: z.string(),
  n: z.string(),
  e: z.string(),
});

export const jwksSchema = z.object({
  keys: z.array(jwkSchema),
});

export type JWK = z.infer<typeof jwkSchema>;
export type JWKS = z.infer<typeof jwksSchema>;

export const forgotPasswordSchema = z.object({
  message: z.string(),
  resetToken: z.string().optional(),
});

export type ForgotPasswordResponse = z.infer<typeof forgotPasswordSchema>;

export const ResetPasswordSchema = z.object({
  password_changed: z.boolean(),
});

export type ResetPasswordResponse = z.infer<typeof ResetPasswordSchema>;

export const ErrorResetCodeSchema = z.enum([
  "WEAK_PASSWORD",
  "INVALID_TOKEN",
  "EXPIRED_TOKEN",
]);

export const ErrorResetSchema = z.object({
  error: z.object({
    code: ErrorResetCodeSchema,
    message: z.string(),
    details: z
      .object({
        failed_rules: z.array(z.string()),
      })
      .optional(),
    request_id: z.string().optional(),
  }),
});

export type ErrorCode = z.infer<typeof ErrorCodeSchema>;
export type ErrorResponse = z.infer<typeof ErrorResetSchema>;
